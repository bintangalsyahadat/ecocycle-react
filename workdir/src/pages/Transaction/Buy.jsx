import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import SelectCategory from "../../components/transaction/SelectCategory";
import BuyConfirmation from "../../components/transaction/buy/BuyConfirmation";
import {
    createBuyTransaction,
    fetchCategories,
    fetchDeliveryMethod,
    fetchOperatingUnits,
    fetchPaymentMethod,
    updateUserOperatingUnit,
} from "../../utils/api";

const BuyPage = ({ currentUser }) => {
    const navigate = useNavigate();

    // --------------------------------
    // STEPS
    // --------------------------------
    const [step, setStep] = useState(1);

    // --------------------------------
    // PAGE DATA
    // --------------------------------
    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [items, setItems] = useState({});

    // --------------------------------
    // Branch selection
    // --------------------------------
    const [selectedBranch, setSelectedBranch] = useState(false);

    // --------------------------------
    // BUY INFO (computed only!)
    // --------------------------------
    const [note, setNote] = useState("");
    const [photos, setPhotos] = useState([]);
    const [selectedMetode, setSelectedMetode] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // normalize OU helper
    const getOUId = (ou) => (ou ? ou.id || ou : null);

    useEffect(() => {
        getBranches();
        getCategories();
        getDeliveryMethods();
        getPaymentMethods();
    }, []);

    // Update user OU only once after branch selection
    useEffect(() => {
        if (selectedBranch) updateUserBranch();
    }, [selectedBranch]);

    const getBranches = async () => {
        const res = await fetchOperatingUnits();
        setBranches(res);
    };

    const getDeliveryMethods = async () => {
        const res = await fetchDeliveryMethod(null, "sale");
        setDeliveryMethods(res);
    };

    const getPaymentMethods = async () => {
        const res = await fetchPaymentMethod();
        setPaymentMethods(res);
    };

    const updateUserBranch = async () => {
        const userOU = getOUId(currentUser?.current_ou_id);

        if (userOU !== selectedBranch.id) {
            const updatedUser = await updateUserOperatingUnit(currentUser, selectedBranch);
            const newOU = getOUId(updatedUser?.current_ou_id);

            if (!newOU) alert("Fail to update location branch");
        }
    };

    const getCategories = async () => {
        const result = await fetchCategories();
        setCategories(result);

        const initial = {};
        result.forEach((cat) => (initial[cat.name] = 0));
        setItems(initial);
    };

    // --------------------------------
    // FILTERED ITEMS
    // --------------------------------
    const filteredItems = categories
        .filter((cat) => items[cat.name] > 0)
        .map((cat) => ({
            ...cat,
            price: cat.sales_price,
            qty: items[cat.name],
            total: items[cat.name] * cat.sales_price,
        }));

    // --------------------------------
    // COMPUTED BUY INFO (no state)
    // --------------------------------
    const buyInfo = {
        metode: selectedMetode || deliveryMethods[0] || null,
        paymentMethod: selectedPayment || null,
        catatan: note,
        photos: photos,
        items: filteredItems,
    };

    // --------------------------------
    // CREATE TRANSACTION
    // --------------------------------
    const BuyConfirmationTransaction = async () => {
        try {
            const utcString = new Date().toISOString();

            const data = {
                date: utcString,
                partner_id: currentUser.id,
                operating_unit_id: currentUser.current_ou_id.id,
                delivery_method_id: buyInfo.metode?.method.id,
                delivery_address_id: buyInfo.metode?.address.id || (currentUser?.address && currentUser?.address[0])?.id || currentUser.id,
                payment_method_id: buyInfo.paymentMethod?.id,
                note: buyInfo.catatan,
                line_ids: buyInfo.items.map((item) => ({
                    waste_category_id: item.id,
                    quantity: item.qty,
                })),
            };

            const transaction = await createBuyTransaction(data);
            const checkout_url = transaction?.payment_ids?.[0]?.xendit_checkout_url;

            if (checkout_url) {
                window.location.replace(checkout_url);
            } else {
                window.location.replace(`/transaction/buy/${transaction?.name}`);
            }
        } catch (err) {
            console.error(err);
            alert("Gagal membuat transaksi, coba lagi");
        }
    };

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            {/* STEP 1 */}
            {step === 1 && (
                <SelectCategory
                    categories={categories}
                    items={items}
                    setItems={setItems}
                    onNext={() => setStep(2)}
                    type={"buy"}
                />
            )}

            {/* Branch selection overlay */}
            {!selectedBranch && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative max-h-[42vh] flex flex-col">
                        <h4 className="text-lg font-semibold mb-4">Select EcoLocation</h4>

                        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
                            {branches.map((branch) => {
                                const userOU = getOUId(currentUser?.current_ou_id);
                                const active = userOU === branch.id;

                                return (
                                    <div
                                        key={branch.id}
                                        onClick={() => setSelectedBranch(branch)}
                                        className={`p-3 border rounded-xl cursor-pointer ${
                                            active
                                                ? "bg-(--main-color) text-white"
                                                : "hover:border-(--main-color) hover:border-2"
                                        }`}
                                    >
                                        <p className="font-bold mb-2">{branch.name}</p>
                                        <p className={`text-xs ${active ? "text-white" : "text-gray-600"}`}>
                                            {branch.address?.street}, {branch.address?.city},{" "}
                                            {branch.address?.state_id?.name},{" "}
                                            {branch.address?.country_id?.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() =>
                                currentUser.current_ou_id
                                    ? setSelectedBranch(currentUser.current_ou_id)
                                    : navigate("/dashboard")
                            }
                            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer font-medium py-2 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <BuyConfirmation
                    items={filteredItems}
                    deliveryMethods={deliveryMethods}
                    paymentMethods={paymentMethods}
                    branches={branches}
                    currentUser={currentUser}
                    onBack={() => setStep(1)}

                    updateItem={(name, value) =>
                        setItems({ ...items, [name]: value })
                    }

                    /** new handlers */
                    buyInfo={buyInfo}
                    onChangeNote={(val) => setNote(val)}
                    onChangePhoto={(val) => setPhotos(val)}

                    onChangeMetode={(m) => setSelectedMetode(m)}
                    onChangePayment={(p) => setSelectedPayment(p)}

                    onNext={BuyConfirmationTransaction}
                />
            )}
        </div>
    );
};

export default function Buy() {
    const { userLoggedIn, currentUser } = useAuth();
    return !userLoggedIn ? <Navigate to="/login" replace /> : <BuyPage currentUser={currentUser} />;
}
