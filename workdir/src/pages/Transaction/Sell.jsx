import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import SelectCategory from "../../components/transaction/SelectCategory";
import SellConfirmation from "../../components/transaction/sell/SellConfirmation";

import {
    createSellTransaction,
    fetchCategories,
    fetchDeliveryMethod,
    fetchOperatingUnits,
    updateUserOperatingUnit
} from "../../utils/api";

const SellPage = ({ currentUser }) => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState(false);

    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const [deliveryMethods, setDeliveryMethods] = useState([]);

    const [items, setItems] = useState({});

    // editable fields
    const [catatan, setCatatan] = useState("");
    const [fotos, setFotos] = useState([]);

    const getOUId = (ou) => (ou?.id ? ou.id : ou || null);

    // ============================
    // FETCH INITIAL DATA
    // ============================
    useEffect(() => {
        getBranches();
        getCategories();
        getDeliveryMethods();
    }, []);

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
        const res = await fetchDeliveryMethod(null, "purchase");
        setDeliveryMethods(res);
    };

    const updateUserBranch = async () => {
        const userOU = getOUId(currentUser?.current_ou_id);

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

        const initialItems = {};
        categoriesResult.forEach((cat) => {
            initialItems[cat.name] = 0;
        });
        setItems(initialItems);
    };

    // ============================
    // COMPUTED FILTERED ITEMS
    // ============================
    const filteredItems = categories
        .filter((cat) => items[cat.name] > 0)
        .map((cat) => ({
            ...cat,
            price: cat.purchase_price,
            qty: items[cat.name],
            total: items[cat.name] * cat.purchase_price,
        }));

    // ============================
    // TRANSACTION SUBMISSION
    // ============================
    const SellConfirmationTransaction = async (finalData) => {
        try {
            const utcString = new Date().toISOString();

            const data = {
                date: utcString,
                partner_id: currentUser.id,
                operating_unit_id: currentUser.current_ou_id.id,
                delivery_method_id: finalData.deliveryMethod?.id,
                delivery_address_id: finalData.deliveryAddress?.id || currentUser.id,
                note: finalData.note,
                line_ids: filteredItems.map((item) => ({
                    waste_category_id: item.id,
                    quantity: item.qty,
                })),
            };

            const transaction = await createSellTransaction(data);
            window.location.replace(`/transaction/sell/${transaction.name}`);
        } catch (err) {
            console.error(err);
            alert("Gagal membuat transaksi, coba lagi");
        }
    };

    // ============================
    // PAGE RENDER
    // ============================
    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            {/* STEP 1: PILIH KATEGORI */}
            {step === 1 && (
                <SelectCategory
                    categories={categories}
                    items={items}
                    setItems={setItems}
                    onNext={() => setStep(2)}
                />
            )}

            {/* BRANCH SELECTION OVERLAY */}
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
                                currentUser?.current_ou_id
                                    ? setSelectedBranch(currentUser?.current_ou_id)
                                    : navigate("/dashboard")
                            }
                            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer font-medium py-2 rounded-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: KONFIRMASI */}
            {step === 2 && (
                <SellConfirmation
                    items={filteredItems}
                    deliveryMethods={deliveryMethods}
                    branches={branches}
                    currentUser={currentUser}
                    onBack={() => setStep(1)}
                    updateItem={(name, value) => setItems({ ...items, [name]: value })}
                    catatan={catatan}
                    fotos={fotos}
                    setCatatan={setCatatan}
                    setFotos={setFotos}
                    onNext={SellConfirmationTransaction}
                />
            )}
        </div>
    );
};

// ============================
// AUTH WRAPPER
// ============================
export default function Sell() {
    const { userLoggedIn, currentUser } = useAuth();
    return !userLoggedIn ? (
        <Navigate to="/login" replace />
    ) : (
        <SellPage currentUser={currentUser} />
    );
}
