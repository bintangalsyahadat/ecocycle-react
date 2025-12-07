    import React, { useState } from "react";
    import { Navigate, useNavigate } from "react-router-dom";
    import Navbar from "/src/components/navbar/Navbar.jsx";
    import AddAddress from "./AddAddress";
    import EditName from "./EditName";
    import EditEmail from "./EditEmail";
    import EditPhone from "./EditPhone";
    import EditPassword from "./EditPassword";
    import { motion } from "framer-motion";
    import Withdraw from "./Withdraw";
    import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
    import LoadingScreen from "../pages/LoadingScreen";
    import { useAuth } from "../contexts/authContext";

    export default function Profile() {
        const { currentUser, userLoggedIn, loading, refreshUser } = useAuth();
        const navigate = useNavigate();

        const [activeTab, setActiveTab] = useState("biodata");
        const [slideDirection, setSlideDirection] = useState("right");

        const [openAddress, setOpenAddress] = useState(false);
        const [addressSaved, setAddressSaved] = useState(false);
        const [openNameModal, setOpenNameModal] = useState(false);
        const [openEmailModal, setOpenEmailModal] = useState(false);
        const [openPhoneModal, setOpenPhoneModal] = useState(false);
        const [openPasswordModal, setOpenPasswordModal] = useState(false);
        const [openWithdraw, setOpenWithdraw] = useState(false);

        if (!userLoggedIn) return <Navigate to="/login" replace />;

        return (
            <div className="relative">
                {LoadingScreen(loading || !currentUser)}

                <div className={`bg-[#F8F9FA] min-h-screen ${loading || !currentUser ? "hidden" : ""}`}>
                    <Navbar />

                    {/* GRID UTAMA */}
                    <div className="max-w-7xl mx-auto py-8 px-4">

                        {/* ================= HEADER (MOBILE ONLY) ================= */}
                        <div className="md:hidden mb-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-[var(--main-color)] text-3xl hover:opacity-70 transition cursor-pointer"
                                >
                                    <FaCircleChevronLeft className="text-xl text-[var(--main-color)]" />
                                </button>

                                <h2 className="text-xl font-semibold text-gray-800">Akun Saya</h2>
                            </div>
                        </div>


                        {/* =============== GRID LAYOUT =============== */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                            {/* ================= SIDEBAR & CARD ================= */}
                            <div className="lg:col-span-1 space-y-4">

                                {/* CARD PROFIL */}
                                <aside className="bg-white rounded-2xl shadow p-5 h-fit">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>

                                            <button
                                                onClick={() => setOpenPhoneModal(true)}
                                                className="text-xs text-[color:var(--main-color)] hover:underline"
                                            >
                                                {currentUser?.phone ? "Ubah Nomor HP" : "Tambah Nomor HP"}
                                            </button>
                                        </div>
                                    </div>
                                </aside>

                                <div className="flex flex-col md:flex-row lg:flex-col gap-4">

                                    {/* CARD COIN */}
                                    <div className="bg-white rounded-2xl shadow p-4 flex-1 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-md font-bold mb-2">Total Coin</p>
                                            <div className="flex items-center gap-3">
                                                <img src="/images/ecopoint/coin.png" className="w-6 h-6" />
                                                <span className="text-gray-900 font-medium">{currentUser?.total_coin}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setOpenWithdraw(true)}
                                            className="inline-flex items-center justify-center bg-(--main-color) hover:bg-(--main-color-hover) cursor-pointer text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors duration-300"
                                        >
                                            Withdraw
                                        </button>
                                    </div>

                                    {/* CARD POINT */}
                                    <div className="bg-white rounded-2xl shadow p-4 flex-1 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-md font-bold mb-2">Total Point</p>
                                            <div className="flex items-center gap-3">
                                                <img src="/images/ecopoint/point.png" className="w-6 h-6" />
                                                <span className="text-gray-900 font-medium">{currentUser?.total_point}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate("/ecopoint")}
                                            className="text-[var(--main-color)] text-3xl hover:opacity-70 transition p-3 cursor-pointer"
                                        >
                                            <FaCircleChevronRight className="text-xl text-[var(--main-color)]" />
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* ================= MAIN CONTENT ================= */}
                            <div className="lg:col-span-3 order-1 lg:order-none">

                                {/* HEADER DESKTOP */}
                                <div className="bg-white rounded-2xl shadow p-3 mb-3 hidden md:block">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => navigate("/dashboard")}
                                            className="text-[var(--main-color)] text-3xl hover:opacity-70 transition me-2 cursor-pointer"
                                        >
                                            <FaCircleChevronLeft className="text-xl text-[var(--main-color)]" />
                                        </button>

                                        <h2 className="text-xl font-semibold text-gray-800">Akun Saya</h2>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl shadow p-5">

                                    {/* TAB MENU */}
                                    <div className="border-b border-gray-300 flex gap-10 mb-8 text-gray-600 text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                setSlideDirection("right");
                                                setActiveTab("biodata");
                                            }}
                                            className={`pb-3 ${activeTab === "biodata"
                                                ? "border-b-2 border-[color:var(--main-color)] text-[color:var(--main-color)]"
                                                : "hover:text-[color:var(--main-color)]"
                                                }`}
                                        >
                                            Biodata Diri
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSlideDirection("left");
                                                setActiveTab("alamat");
                                            }}
                                            className={`pb-3 ${activeTab === "alamat"
                                                ? "border-b-2 border-[color:var(--main-color)] text-[color:var(--main-color)]"
                                                : "hover:text-[color:var(--main-color)]"
                                                }`}
                                        >
                                            Daftar Alamat
                                        </button>
                                    </div>


                                    {/* =============== BIODATA =============== */}
                                    {activeTab === "biodata" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: slideDirection === "right" ? -20 : 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.28 }}
                                        >
                                            <div className="md:col-span-2 space-y-5">

                                                {/* NAMA */}
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Nama</h3>
                                                    <div className="flex items-center justify-between">
                                                        <p>{currentUser?.name}</p>
                                                        <button
                                                            className="cursor-pointer text-[color:var(--main-color)] text-sm"
                                                            onClick={() => setOpenNameModal(true)}
                                                        >
                                                            Ubah
                                                        </button>
                                                    </div>
                                                </div>

                                                <hr className="border-gray-300" />

                                                {/* EMAIL */}
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                                    <div className="flex items-center justify-between">
                                                        <p>{currentUser?.email}</p>
                                                        <button
                                                            className="cursor-pointer text-[color:var(--main-color)] text-sm"
                                                            onClick={() => setOpenEmailModal(true)}
                                                        >
                                                            Ubah
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* PHONE */}
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-1">Nomor HP</h3>
                                                    <div className="flex items-center justify-between">
                                                        <p>{currentUser?.phone || "Belum ditambahkan"}</p>

                                                        <button
                                                            className="cursor-pointer text-[color:var(--main-color)] text-sm"
                                                            onClick={() => setOpenPhoneModal(true)}
                                                        >
                                                            {currentUser?.phone ? "Ubah" : "Tambah"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}


                                    {/* =============== ALAMAT =============== */}
                                    {activeTab === "alamat" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: slideDirection === "left" ? 40 : -40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.28 }}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Alamat</h3>

                                            <button
                                                onClick={() => setOpenAddress(true)}
                                                className="cursor-pointer bg-[color:var(--main-color)] text-white px-4 py-2 rounded-xl hover:bg-teal-700 mb-3"
                                            >
                                                + Tambah Alamat
                                            </button>

                                            <AddAddress
                                                currentUser={currentUser}
                                                open={openAddress}
                                                onClose={() => setOpenAddress(false)}
                                                onSaved={() => {refreshUser(); setAddressSaved(true);}}
                                            />

                                            {addressSaved && (
                                                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300 mb-3">
                                                    Alamat baru berhasil ditambahkan.
                                                </div>
                                            )}

                                            <div>
                                                {currentUser?.address?.map((addr) => (
                                                    <div key={addr.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3">
                                                        <p className="text-sm font-medium text-gray-700 mb-1">{addr?.name}</p>
                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                            {addr?.street},
                                                            {" "}{addr?.city},
                                                            {" "}{addr?.state_id?.name},
                                                            {" "}{addr?.country_id?.name}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ================= MODAL ================= */}
                    <EditName
                        open={openNameModal}
                        onClose={() => setOpenNameModal(false)}
                        currentName={currentUser?.name}
                        onSave={(newName) => setUserName(newName)}
                    />

                    <EditEmail
                        open={openEmailModal}
                        onClose={() => setOpenEmailModal(false)}
                        currentEmail={currentUser?.email}
                        onSave={(newEmail) => setUserEmail(newEmail)}
                    />

                    <EditPhone
                        open={openPhoneModal}
                        onClose={() => setOpenPhoneModal(false)}
                        currentPhone={currentUser?.phone}
                        onSave={(newPhone) => setUserPhone(newPhone)}
                    />

                    <EditPassword
                        open={openPasswordModal}
                        onClose={() => setOpenPasswordModal(false)}
                        onSave={(data) => console.log("Password Updated:", data)}
                    />

                    <Withdraw
                        open={openWithdraw}
                        onClose={() => setOpenWithdraw(false)}
                    />
                </div>
            </div>

        );
    }
