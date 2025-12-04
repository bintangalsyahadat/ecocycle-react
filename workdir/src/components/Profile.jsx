import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "/src/components/navbar/Navbar.jsx";
import AddAddress from "./AddAddress";
import EditName from "./EditName";
import EditEmail from "./EditEmail";
import EditPhone from "./EditPhone";
import EditPassword from "./EditPassword";
import { motion } from "framer-motion";
import Withdraw from "./Withdraw";

export default function Profile() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("biodata");
    const [slideDirection, setSlideDirection] = useState("right");

    const [openAddress, setOpenAddress] = useState(false);
    const [addressSaved, setAddressSaved] = useState(false);

    const [openNameModal, setOpenNameModal] = useState(false);
    const [userName, setUserName] = useState("USER");

    const [openEmailModal, setOpenEmailModal] = useState(false);
    const [userEmail, setUserEmail] = useState("user@gmail.com");

    const [openPhoneModal, setOpenPhoneModal] = useState(false);
    const [userPhone, setUserPhone] = useState("");

    const [openPasswordModal, setOpenPasswordModal] = useState(false);

    const [openWithdraw, setOpenWithdraw] = useState(false);

    return (
        <div className="w-full min-h-screen bg-[#F8F9FA]">
            <Navbar />

            {/* GRID UTAMA */}
            <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* ================= SIDEBAR & CARD ================= */}
                <div className="lg:col-span-1 space-y-4">

                    {/* CARD PROFIL */}
                    <aside className="bg-white rounded-2xl shadow p-5 h-fit">
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src=""
                                className="w-12 h-12 rounded-full bg-gray-200"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">{userName}</h3>

                                <button
                                    onClick={() => setOpenPhoneModal(true)}
                                    className="text-xs text-[color:var(--main-color)] hover:underline"
                                >
                                    {userPhone ? "Ubah Nomor HP" : "Tambah Nomor HP"}
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* CARD POINT */}
                    <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <img src="/images/ecopoint/point.png" className="w-6 h-6" />
                            <span className="text-gray-900 font-medium">Point: 0</span>
                        </div>

                        <button
                            onClick={() => navigate("/ecopoint")}
                            className="px-3 py-1 cursor-pointer hover:shadow-md transition bg-[color:var(--main-color)] text-white text-sm rounded-xl">
                            &rarr;
                        </button>
                    </div>


                    {/* CARD COIN */}
                    <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between gap-3 ">
                        <div className="flex items-center gap-3">
                            <img src="/images/ecopoint/coin.png" className="w-6 h-6" />
                            <span className="text-gray-900 font-medium">Coin: 0</span>
                        </div>

                        <button
                            onClick={() => setOpenWithdraw(true)}
                            className="px-3 py-1 cursor-pointer hover:shadow-md transition bg-[color:var(--main-color)] text-white text-sm rounded-xl">
                            &rarr;
                        </button>
                    </div>

                </div>

                {/* ================= MAIN CONTENT ================= */}
                <section className="lg:col-span-3 bg-white rounded-2xl shadow p-8">

                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="cursor-pointer text-3xl text-gray-600 hover:text-[color:var(--main-color)]"
                        >
                            &larr;
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">Akun Saya</h2>
                    </div>

                    {/* TAB MENU */}
                    <div className="border-b flex gap-10 mb-8 text-gray-600 text-sm font-medium">
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

                    {/* ====================== BIODATA ====================== */}
                    {activeTab === "biodata" && (
                        <motion.div
                            initial={{ opacity: 0, x: slideDirection === "right" ? -40 : 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.28 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-10"
                        >
                            {/* FOTO */}
                            <div>
                                <div className="border rounded-xl p-4 flex flex-col items-center">
                                    <div className="w-40 h-40 rounded-xl overflow-hidden mb-3 border">
                                        <img
                                            src="https://via.placeholder.com/300"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button className="border cursor-pointer rounded-lg px-4 py-2 text-sm font-medium hover:bg-[color:var(--main-color)]">
                                        Pilih Foto
                                    </button>
                                </div>

                                <div className="mt-5 space-y-3">
                                    <button
                                        onClick={() => setOpenPasswordModal(true)}
                                        className="w-full border cursor-pointer rounded-lg py-2 hover:bg-[color:var(--main-color)]"
                                    >
                                        Ubah Kata Sandi
                                    </button>
                                </div>
                            </div>

                            {/* DATA */}
                            <div className="md:col-span-2 space-y-5">

                                {/* NAMA */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Nama</h3>
                                    <div className="flex items-center justify-between">
                                        <p>{userName}</p>
                                        <button
                                            className="cursor-pointer text-[color:var(--main-color)] text-sm"
                                            onClick={() => setOpenNameModal(true)}
                                        >
                                            Ubah
                                        </button>
                                    </div>
                                </div>

                                <hr />

                                {/* EMAIL */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <div className="flex items-center justify-between">
                                        <p>{userEmail}</p>
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
                                        <p>{userPhone || "Belum ditambahkan"}</p>

                                        <button
                                            className="cursor-pointer text-[color:var(--main-color)] text-sm"
                                            onClick={() => setOpenPhoneModal(true)}
                                        >
                                            {userPhone ? "Ubah" : "Tambah"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ====================== ALAMAT ====================== */}
                    {activeTab === "alamat" && (
                        <motion.div
                            initial={{ opacity: 0, x: slideDirection === "left" ? 40 : -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.28 }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Daftar Alamat
                            </h3>

                            <button
                                onClick={() => setOpenAddress(true)}
                                className="cursor-pointer bg-[color:var(--main-color)] text-white px-4 py-2 rounded-xl hover:bg-teal-700"
                            >
                                + Tambah Alamat
                            </button>

                            <AddAddress
                                open={openAddress}
                                onClose={() => setOpenAddress(false)}
                                onSaved={() => setAddressSaved(true)}
                            />

                            {addressSaved && (
                                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">
                                    Alamat baru berhasil ditambahkan.
                                </div>
                            )}

                            <div className="border rounded-xl p-4 text-gray-700 mt-6">
                                Belum ada alamat tersimpan.
                            </div>
                        </motion.div>
                    )}
                </section>
            </div>

            {/* ================= MODAL ================= */}
            <EditName
                open={openNameModal}
                onClose={() => setOpenNameModal(false)}
                currentName={userName}
                onSave={(newName) => setUserName(newName)}
            />

            <EditEmail
                open={openEmailModal}
                onClose={() => setOpenEmailModal(false)}
                currentEmail={userEmail}
                onSave={(newEmail) => setUserEmail(newEmail)}
            />

            <EditPhone
                open={openPhoneModal}
                onClose={() => setOpenPhoneModal(false)}
                currentPhone={userPhone}
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
    );
}
