import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditNameModal({ open, onClose, currentName, onSave }) {
    const [name, setName] = useState(currentName || "");

    if (!open) return null;

    return (
        <AnimatePresence>
            {/* BACKDROP */}
            <motion.div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* MODAL BOX */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-8 relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-semibold mb-3">Ubah Nama</h2>

                    <p className="text-gray-600 text-sm mb-5">
                        Kamu hanya dapat mengubah nama 1 kali lagi. Pastikan nama sudah benar.
                    </p>

                    <label className="text-sm font-medium text-gray-700">Nama</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-1 focus:outline-none text-gray-800"
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Nama dapat dilihat oleh pengguna lainnya
                    </p>

                    {/* BUTTON SIMPAN */}
                    <button
                        disabled={name.trim() === ""}
                        onClick={() => {
                            onSave(name);
                            onClose();
                        }}
                        className={`w-full py-3 rounded-xl mt-6 font-semibold
                            ${name.trim() === "" 
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                                : "bg-[color:var(--main-color)] text-white hover:bg-teal-700"}
                        `}
                    >
                        Simpan
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
