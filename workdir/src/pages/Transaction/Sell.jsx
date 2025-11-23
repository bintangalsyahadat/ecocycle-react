import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import SelectCategory from "../../components/transaction/SelectCategory";
import SellConfirmation from "../../components/transaction/sell/SellConfirmation";
import { createPurchaseTransaction, fetchCategories, fetchDeliveryMethod, fetchOperatingUnits, updateUserOperatingUnit } from "../../utils/api";

const SellPage = ({ currentUser }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState(false);
    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [sellInfo, setSellInfo] = useState({});

    const [items, setItems] = useState({});

    // -----------------------------
    // Normalize OU helper
    // -----------------------------
    const getOUId = (ou) => {
        if (!ou) return null;
        return ou.id || ou;   // bisa dapat object {id} atau number
    };

    useEffect(() => {
        getBranches();
        getCategories();
        getDeliveryMethods();

    }, []);

    useEffect(() => {
        setSellInfo({
            metode: deliveryMethods[0],
            catatan: "",
            fotos: [],
            status: "Menunggu Validasi",
        })
    }, [deliveryMethods]);

    // Update user OU only ONCE after selecting branch
    useEffect(() => {
        if (selectedBranch) {
            updateUserBranch();
        }
    }, [selectedBranch]);

    const getBranches = async () => {
        const res = await fetchOperatingUnits();
        setBranches(res);
    };

    const getDeliveryMethods = async () => {
        const res = await fetchDeliveryMethod(null, 'purchase');
        setDeliveryMethods(res);
    };

    const updateUserBranch = async () => {
        const userOU = getOUId(currentUser?.current_ou_id);

        // Hanya update jika OU berbeda
        if (userOU !== selectedBranch.id) {
            const updatedUser = await updateUserOperatingUnit(currentUser, selectedBranch);

            const newUserOU = getOUId(updatedUser?.current_ou_id);

            if (!newUserOU) {
                alert("Fail to update location branch");
            }
        }
    };

    const getCategories = async () => {
        const categoriesResult = await fetchCategories();
        setCategories(categoriesResult);

        // generate initial item counts = 0
        const initialItems = {};
        categoriesResult.forEach((cat) => {
            initialItems[cat.name] = 0;
        });
        setItems(initialItems);
    };

    // filtered only selected categories
    const filteredItems = categories
        .filter((cat) => items[cat.name] > 0)
        .map((cat) => ({
            ...cat,
            price: cat.purchase_price,
            qty: items[cat.name],
            total: items[cat.name] * cat.purchase_price,
        }));

    const SellConfirmationTransaction = async () => {
        try {
            const utcString = new Date().toISOString();

            const data = {
                date: utcString,
                partner_id: currentUser.id,
                operating_unit_id: currentUser.current_ou_id.id,
                delivery_method_id: sellInfo.metode.id,
                delivery_address_id: currentUser.id,
                note: sellInfo.catatan,
                line_ids: filteredItems.map((item) => ({
                    waste_category_id: item.id,
                    quantity: item.qty,
                }))
            };

            const transaction = await createPurchaseTransaction(data);

            window.location.replace(`/transaction/sell/${transaction.id}`);
        } catch (err) {
            console.error(err);
            alert("Gagal membuat transaksi, coba lagi");
            throw err; 
        }
    };


    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            {/* STEP 1 - pilih kategori */}
            {step === 1 && (
                <SelectCategory
                    categories={categories}
                    items={items}
                    setItems={setItems}
                    onNext={() => setStep(2)}
                />
            )}

            {/* Branch selection overlay */}
            {!selectedBranch && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
                        <h4 className="text-lg font-semibold mb-4">Select EcoLocation</h4>

                        <div className="space-y-3">
                            {branches.map((branch) => {
                                const userOU = getOUId(currentUser?.current_ou_id);
                                const active = userOU === branch.id;

                                return (
                                    <div
                                        key={branch.id}
                                        onClick={() => setSelectedBranch(branch)}
                                        className={`p-3 border rounded-xl cursor-pointer ${active
                                            ? "bg-(--main-color) text-white font-bold"
                                            : "hover:border-(--main-color) hover:border-2"
                                            }`}
                                    >
                                        EcoCycle - {branch.name}
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => currentUser?.current_ou_id ? setSelectedBranch(currentUser?.current_ou_id) : navigate("/dashboard")}
                            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer font-medium py-2 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2 - konfirmasi */}
            {step === 2 && (
                <SellConfirmation
                    items={filteredItems}
                    deliveryMethods={deliveryMethods}
                    onBack={() => setStep(1)}
                    updateItem={(name, value) => setItems({ ...items, [name]: value })}
                    sellInfo={sellInfo}
                    setSellInfo={setSellInfo}
                    onNext={() => SellConfirmationTransaction()}
                />
            )}

            {/* STEP 3 kalau nanti kamu aktifkan */}
            {/* {step === 3 && (
                <SellDetail
                    items={filteredItems}
                    sellInfo={sellInfo}
                    onBack={() => setStep(2)}
                />
            )} */}
        </div>
    );
};

export default function Sell() {
    const { userLoggedIn, currentUser } = useAuth();
    return !userLoggedIn ? <Navigate to="/login" replace /> : <SellPage currentUser={currentUser} />;
}
