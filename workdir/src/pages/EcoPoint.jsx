import Navbar from "../components/navbar/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserPlus, FaFileLines, FaClockRotateLeft } from "react-icons/fa6";
import { useState } from "react";
import SyaratKetentuan from "../components/ecopoint/TermsConditions";
import AjakTeman from "../components/ecopoint/InviteFriend";
import { useAuth } from "../contexts/authContext";
import DailyCard from "../components/DailyCard";
import UserGretting from "../components/UserGreeting";
import { motion } from "framer-motion";

export default function EcoPoint() {
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [showSyaratKetentuan, setShowSyaratKetentuan] = useState(false);
    const [showAjakTeman, setShowAjakTeman] = useState(false);

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

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const containerStagger = {
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <>
            {!userLoggedIn ? (
                <Navigate to="/login" replace={true} />
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerStagger}
                    className="min-h-screen bg-[#F8F9FA]"
                >
                    <Navbar />

                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">

                        <motion.div variants={fadeUp}>
                            <UserGretting currentUser={currentUser} />
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mb-5 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-500">Total EcoPoint</p>
                                    <div className="flex text-xl items-center font-bold text-[color:var(--main-color)]">
                                        <img
                                            src="/images/ecopoint/point.png"
                                            alt="coin"
                                            className="w-5 me-1"
                                        />
                                        <p>{currentUser.total_point}</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    {[
                                        {
                                            icon: <FaClockRotateLeft />,
                                            label: "History",
                                            action: () => navigate("/ecopoint/history"),
                                        },
                                        {
                                            icon: <FaUserPlus />,
                                            label: "Invite Friends",
                                            action: () => setShowAjakTeman(true),
                                        },
                                        {
                                            icon: <FaFileLines />,
                                            label: "T&C",
                                            action: () => setShowSyaratKetentuan(true),
                                        },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            onClick={item.action}
                                            whileTap={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="flex flex-col items-center cursor-pointer"
                                        >
                                            <div className="w-11 h-11 bg-[#E6F8F8] rounded-full flex items-center justify-center">
                                                <span className="text-[#00A8A8] text-2xl">{item.icon}</span>
                                            </div>
                                            <p className="text-xs mt-1 text-gray-600">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Daily Card Animation */}
                        <motion.div variants={fadeUp}>
                            <DailyCard currentUser={currentUser} />
                        </motion.div>

                        {/* Rewards */}
                        <motion.div variants={fadeUp} className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mt-5">
                            <h2 className="text-xl font-semibold text-gray-500 mb-4">Rewards</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {rewards?.map((r, i) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeUp}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="rounded-xl overflow-hidden shadow-md cursor-pointer transition"
                                    >
                                        <img src={r.img} className="w-full h-32 object-cover" />

                                        <div className="p-3 flex justify-between items-center">
                                            <p className="text-sm font-semibold">{r.title}</p>

                                            <p className="font-bold text-[#00A8A8] flex items-center gap-1">
                                                {r.point}
                                                <img src="/images/ecopoint/point.png" className="w-5 h-5" />
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <SyaratKetentuan open={showSyaratKetentuan} onClose={() => setShowSyaratKetentuan(false)} />
                    <AjakTeman open={showAjakTeman} onClose={() => setShowAjakTeman(false)} />
                </motion.div>
            )}
        </>
    );
}
