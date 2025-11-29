import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaFileLines, FaClockRotateLeft } from "react-icons/fa6";
import { useState } from "react";
import SyaratKetentuan from "../components/ecopoint/SyaratKetentuan";
import AjakTeman from "../components/ecopoint/AjakTeman";

export default function EcoPoint() {
    const navigate = useNavigate();
    const [showSyaratKetentuan, setShowSyaratKetentuan] = useState(false);
    const [showAjakTeman, setShowAjakTeman] = useState(false);

    const streak = [
        { day: "Today", point: 10 },
        { day: "Day 2", point: 20 },
        { day: "Day 3", point: 30 },
        { day: "Day 4", point: 40 },
        { day: "Day 5", point: 50 },
        { day: "Day 6", point: 60 },
        { day: "Day 7", point: 70 },
    ];

    const rewards = [
        {
            img: "/public/images/ecopoint/alfamart.png",
            title: "Voucher Belanja 50k Alfamart",
            point: 500,
        },
        {
            img: "/public/images/ecopoint/pupuk.png",
            title: "Pupuk Organik 5Kg",
            point: 300,
        },
        {
            img: "/public/images/ecopoint/xl.png",
            title: "Voucher Pulsa 50k XL",
            point: 800,
        },
        {
            img: "/public/images/ecopoint/pln.png",
            title: "Voucher PLN 100k",
            point: 1000,
        },
    ];

    return (
        <div className="min-h-screen bg-[#E6F2EF]">
            <Navbar />

            <div className="max-w-4xl mx-auto bg-white mt-4 pb-10 rounded-xl shadow-sm">

                <div className="px-6 pt-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">EcoPoint</h1>
                        <p className="text-gray-600 text-sm mt-1">Halo, User</p>
                        <p className="mt-1 flex items-center gap-2 font-semibold text-[#00A8A8]">
                            Total Point

                            <span className="flex items-center gap-1 text-xl">
                                77
                                <img
                                    src="/public/images/ecopoint/coin.png"
                                    alt="coin"
                                    className="w-6 h-6"
                                />
                            </span>
                        </p>
                    </div>

                    <div className="flex gap-2">
                        {[
                            { icon: <FaClockRotateLeft />, label: "Riwayat", action: () => navigate("/ecopoint/RiwayatAktivitas") },
                            { icon: <FaUserPlus />, label: "Ajak Teman", action: () => setShowAjakTeman(true) },
                            { icon: <FaFileLines />, label: "S&K", action: () => setShowSyaratKetentuan(true) },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center cursor-pointer" onClick={item.action}>
                                <div className="w-11 h-11 bg-[#E6F8F8] rounded-full flex items-center justify-center">
                                    <span className="text-[#00A8A8] text-2xl">{item.icon}</span>
                                </div>
                                <p className="text-xs mt-1 text-gray-600">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    <div className="border rounded-xl p-6 bg-white shadow-sm">
                        <div className="grid grid-cols-7 gap-2">
                            {streak.map((s, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col items-center justify-between gap-1 border rounded-xl p-2 text-center
        ${i === 0 ? "bg-[#00A8A8] text-white" : "bg-[#E6F8F8] text-[#008C8C]"}`}
                                >

                                    <p className="font-bold text-sm">+{s.point}</p>
                                    <img src="/public/images/ecopoint/point.png" className="w-7 h-7 my-1" />
                                    <p className="text-[11px] whitespace-nowrap">{s.day}</p>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-2 bg-[#00A8A8] hover:bg-[#008C8C] text-white rounded-full font-medium">
                            Check in to get points
                        </button>
                    </div>
                </div>

                <div className="px-6">
                    <h2 className="text-xl font-semibold mb-4">Rewards</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {rewards.map((r, i) => (
                            <div
                                key={i}
                                className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition"
                            >
                                <img src={r.img} className="w-full h-32 object-cover" />

                                <div className="p-3 flex justify-between items-center">
                                    <p className="text-sm font-semibold">{r.title}</p>

                                    <p className="font-bold text-[#00A8A8] flex items-center gap-1">
                                        {r.point}
                                        <img src="/public/images/ecopoint/coin.png" className="w-5 h-5" />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-2 bg-[#00A8A8] hover:bg-[#008C8C] text-white font-semibold rounded-full">
                            More Voucher
                        </button>
                    </div>
                </div>
            </div>

            <SyaratKetentuan open={showSyaratKetentuan} onClose={() => setShowSyaratKetentuan(false)} />
            <AjakTeman open={showAjakTeman} onClose={() => setShowAjakTeman(false)} />
        </div>
    );
}
