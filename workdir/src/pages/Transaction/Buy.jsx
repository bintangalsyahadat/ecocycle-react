import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import SelectCategory from "../../components/transaction/SelectCategory";
import BuyConfirmation from "../../components/transaction/buy/BuyConfirmation";
import BuyDetail from "../../components/transaction/buy/BuyDetail";

const BuyPage = () => {
    const [step, setStep] = useState(1);

    const [items, setItems] = useState({
        Plastik: 0,
        Kaca: 0,
        Styrofoam: 0,
        Logam: 0,
        Kertas: 0,
        Lainnya: 0,
    });

    const categories = [
        { name: "Plastik", desc: "Plastik daur ulang (botol, gelas, kemasan), dll.", price: 1000 },
        { name: "Kaca", desc: "Botol, gelas, toples, dll.", price: 1500 },
        { name: "Styrofoam", desc: "Gelas & alat makan sekali pakai, dll.", price: 800 },
        { name: "Logam", desc: "Besi, aluminium, kuningan, kaleng, dll.", price: 3000 },
        { name: "Kertas", desc: "Kardus, majalah, arsip, dll.", price: 1200 },
    ];

    const [buyInfo, setBuyInfo] = useState({
        metode: "",
        catatan: "",
        fotos: [],
        status: "Menunggu Validasi",
    });

    const filteredItems = categories
        .filter(cat => items[cat.name] > 0)
        .map(cat => ({
            ...cat,
            qty: items[cat.name],
            total: items[cat.name] * cat.price,
        }));

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            {step === 1 && (
                <SelectCategory
                    categories={categories}
                    items={items}
                    setItems={setItems}
                    onNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <BuyConfirmation
                    items={filteredItems}
                    onBack={() => setStep(1)}
                    updateItem={(name, value) => setItems({ ...items, [name]: value })}
                    buyInfo={buyInfo}
                    setBuyInfo={setBuyInfo}
                    onNext={() => setStep(3)}
                />
            )}

            {step === 3 && (
                <BuyDetail
                    items={filteredItems}
                    buyInfo={buyInfo}
                    onBack={() => setStep(2)}
                />
            )}
        </div>
    );
};

export default function Sell() {
    const { userLoggedIn } = useAuth();
    return !userLoggedIn ? <Navigate to="/login" replace /> : <BuyPage />;
}
