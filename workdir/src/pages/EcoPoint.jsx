import Navbar from "../components/navbar/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserPlus, FaFileLines, FaClockRotateLeft } from "react-icons/fa6";
import { useState } from "react";
import SyaratKetentuan from "../components/ecopoint/SyaratKetentuan";
import AjakTeman from "../components/ecopoint/AjakTeman";
import { useAuth } from "../contexts/authContext";
import DailyCard from "../components/DailyCard";
import UserGretting from "../components/UserGreeting";

export default function EcoPoint() {
    const { currentUser, userLoggedIn, loading } = useAuth();

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
            img: "/images/ecopoint/alfamart.png",
            title: "Voucher Belanja 50k Alfamart",
            point: 500,
        },
        {
            img: "/images/ecopoint/pupuk.png",
            title: "Pupuk Organik 5Kg",
            point: 300,
        },
        {
            img: "/images/ecopoint/XL.png",
            title: "Voucher Pulsa 50k XL",
            point: 800,
        },
        {
            img: "/images/ecopoint/PLN.png",
            title: "Voucher PLN 100k",
            point: 1000,
        },
    ];

    return (
        <>
            {!userLoggedIn ? <Navigate to="/login" replace={true} /> : <div className="min-h-screen bg-[#F8F9FA]">
                <Navbar />

                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
                    <UserGretting currentUser={currentUser} />

                    <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mb-5">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-500">Total EcoPoint</p>
                                <div className="flex text-xl items-center font-bold text-[color:var(--main-color)]">
                                    <img
                                        src="/images/ecopoint/point.png"
                                        alt="coin"
                                        className="w-6 h-6 me-1"
                                    /> <p>{currentUser.total_point}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {[
                                    { icon: <FaClockRotateLeft />, label: "Riwayat", action: () => navigate("/ecopoint/history") },
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
                    </div>

                    <DailyCard currentUser={currentUser} />

                    <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mt-5">
                        <h2 className="text-xl font-semibold text-gray-500 mb-4">Rewards</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {rewards?.map((r, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition"
                                >
                                    <img src={r.img} className="w-full h-32 object-cover" />

                                    <div className="p-3 flex justify-between items-center">
                                        <p className="text-sm font-semibold">{r.title}</p>

                                        <p className="font-bold text-[#00A8A8] flex items-center gap-1">
                                            {r.point}
                                            <img src="/images/ecopoint/point.png" className="w-5 h-5" />
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="flex justify-center mt-6">
                            <button className="px-6 py-2 bg-[#00A8A8] hover:bg-[#008C8C] text-white font-semibold rounded-full">
                                More Voucher
                            </button>
                        </div> */}
                    </div>
                </div>

                <SyaratKetentuan open={showSyaratKetentuan} onClose={() => setShowSyaratKetentuan(false)} />
                <AjakTeman open={showAjakTeman} onClose={() => setShowAjakTeman(false)} />
            </div>}
        </>

    );
}
