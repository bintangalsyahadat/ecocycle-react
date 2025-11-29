import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { FaRegFileImage, } from "react-icons/fa";
import MapView from "../../components/MapView";
import Bottle from "/public/images/ecoplanner/bottle.png";
import Kaca from "/public/images/ecoplanner/kaca.png";
import Logam from "/public/images/ecoplanner/logam.png";
import Kertas from "/public/images/ecoplanner/kertas.png";
import Lainnya from "/public/images/ecoplanner/lainnya.png";



export default function RencanaBaru() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("Plastik");
    const [weight, setWeight] = useState(0);

    const categories = [
        { label: "Plastik", img: Bottle },
        { label: "Kaca", img: Kaca },
        { label: "Logam", img: Logam },
        { label: "Kertas", img: Kertas },
        { label: "Lainnya", img: Lainnya },
    ];

    return (
        <div className="min-h-screen bg-[#E6F2EF]">
            <Navbar />

            <div className="px-6 py-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-[#00A8A8] text-4xl">←</button>
                <h1 className="text-2xl font-bold text-gray-700">EcoPlanner - Rencana Baru</h1>
            </div>
            <p className="px-14 text-gray-600 -mt-4">Atur Eco Plan mu sesuai kebutuhanmu</p>
            <div className="max-w-5xl mx-auto px-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-semibold text-gray-700 mb-3">Pilih barang</h3>
                    <div className="flex justify-between gap-2">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(cat.label)}
                                className={`border w-[70px] rounded-xl flex flex-col items-center py-2 cursor-pointer
            ${selectedCategory === cat.label ? "border-[#00A8A8] text-[#00A8A8] bg-[#E6F8F8]" : "text-gray-500"}`}
                            >
                                <img src={cat.img} alt={cat.label} className="w-10 h-10 object-contain" />
                                <p className="text-[10px] font-semibold">{cat.label}</p>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        <div>
                            <label className="block text-gray-700 text-sm mb-1">Isi Berat (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full border rounded-lg p-2 mb-4 focus:ring focus:ring-[#00A8A8]"
                                placeholder="Berat (kg)"
                            />

                            <label className="block text-gray-700 text-sm mb-1">Pilih Lokasi</label>
                            <select className="w-full border rounded-lg p-2 mb-4">
                                <option>EcoCycle Kediri (1.2km)</option>
                                <option>EcoCycle Jakarta</option>
                                <option>EcoCycle Surabaya</option>
                            </select>

                            <label className="block text-gray-700 text-sm mb-1">Pilih Waktu</label>
                            <select className="w-full border rounded-lg p-2 mb-4">
                                <option>11/07/2025</option>
                                <option>12/07/2025</option>
                                <option>13/07/2025</option>
                            </select>

                            <button className="w-full border rounded-full py-2 mt-2 text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-100">
                                <FaRegFileImage /> Tambahkan Foto
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-semibold text-xl text-[#00A8A8] mb-3">Estimasi klaim poin</h3>

                    <div className="border-b pb-3 text-gray-700">
                        <p className="flex justify-between">Kategori: <span className="font-semibold">{selectedCategory}</span></p>
                        <p className="flex justify-between">Berat: <span className="font-semibold">{weight} kg</span></p>
                    </div>

                    <div className="text-center mt-6">
                        <p className="font-semibold text-lg text-[#008C8C]">Estimasi Poin</p>
                        <div className="text-5xl flex justify-center text-[#00A8A8] mt-2">
                            <img src="/src/assets/images/ecoplanner/point.png" className="w-20" />
                        </div>
                        <p className="text-3xl font-bold text-[#00A8A8] mt-1">+{weight * 5}</p>
                        <p className="text-sm text-gray-500">(Poin dasar + bonus keaktifan)</p>
                    </div>

                    <button
                        onClick={() => navigate("/ecoplanner/PlannerDetail")}
                        className="w-full bg-[#00A8A8] text-white font-semibold rounded-full py-2 mt-6 hover:bg-[#008C8C]"
                    >
                        Setorkan Misi & Klaim Poin!
                    </button>
                </div>
            </div>
        </div>
    );
}
