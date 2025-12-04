import { FaUserPlus, FaWhatsapp, FaShareAlt, FaGift, FaLink, FaCopy, FaRecycle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

export default function AjakTeman({ open, onClose }) {
    if (!open) return null;

    const kodeReferral = "8A4723";
    const linkBagikan = `https://contoh.com/ref/${kodeReferral}`;

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <IoClose size={28} />
                        </button>

                        {/* HEADER */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <FaUserPlus className="text-[color:var(--main-color)]" size={22} />
                            <h1 className="text-2xl font-semibold text-gray-700">Ajak Teman</h1>
                        </div>

                        {/* KODE REFERRAL */}
                        <div className="mt-6 bg-white border rounded-xl flex items-center p-2">
                            <input
                                readOnly
                                value={`Kode / ${kodeReferral}`}
                                className="flex-1 p-2 text-gray-700 text-lg outline-none"
                            />

                            <button
                                onClick={() => copyText(kodeReferral)}
                                className="bg-[color:var(--main-color)] hover:bg-teal-700 text-white px-5 py-2 rounded-lg"
                            >
                                Salin
                            </button>
                        </div>

                        {/* CARA BERGABUNG */}
                        <div className="mt-6 bg-[#F7F7EE] p-4 rounded-xl">
                            <h2 className="font-semibold text-gray-700 text-lg text-center">
                                Cara Bergabung
                            </h2>

                            <div className="flex justify-between items-center mt-4 text-gray-700 text-sm">
                                <div className="flex flex-col items-center">
                                    <FaUserPlus size={24} className="text-[color:var(--main-color)]" />
                                    <p className="mt-1 text-center">Ajak Teman Baru</p>
                                </div>

                                <p className="text-xl">➤</p>

                                <div className="flex flex-col items-center">
                                    <FaRecycle size={24} className="text-[color:var(--main-color)]" />
                                    <p className="mt-1 text-center">Jual/Beli Sampah</p>
                                </div>

                                <p className="text-xl">➤</p>

                                <div className="flex flex-col items-center">
                                    <FaGift size={24} className="text-[color:var(--main-color)]" />
                                    <p className="mt-1 text-center">Dapatkan Hadiah</p>
                                </div>
                            </div>

                            <button
                                onClick={() => copyText(linkBagikan)}
                                className="w-full bg-[color:var(--main-color)] hover:bg-teal-700 text-white py-3 rounded-lg mt-5"
                            >
                                Salin Link Untuk Bagikan
                            </button>
                        </div>

                        {/* BUTTONS BAWAH */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <button
                                onClick={() => window.open(`https://wa.me/?text=${linkBagikan}`, "_blank")}
                                className="bg-[color:var(--main-color)] hover:bg-teal-700 text-white flex flex-col items-center rounded-lg py-3"
                            >
                                <FaWhatsapp size={28} />
                                <p className="text-sm mt-2">Bagikan di whatsapp</p>
                            </button>

                            <button className="bg-[color:var(--main-color)] hover:bg-teal-700 text-white flex flex-col items-center rounded-lg py-3"
                            >
                                <FaShareAlt size={28} />
                                <p className="text-sm mt-2">Bagikan</p>
                            </button>

                            <button
                                onClick={() => copyText(linkBagikan)}
                                className="bg-[color:var(--main-color)] hover:bg-teal-700 text-white flex flex-col items-center rounded-lg py-3"
                            >
                                <FaLink size={28} />
                                <p className="text-sm mt-2">Salin Tautan</p>
                            </button>
                        </div>
                    </div>
                </div>
    );
}
