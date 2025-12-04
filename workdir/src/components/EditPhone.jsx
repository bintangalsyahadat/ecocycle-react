import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditPhone({ open, onClose, currentPhone, onSave }) {
    const [phone, setPhone] = useState(currentPhone || "");

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl shadow-xl w-[90%] max-w-lg p-8 relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-semibold mb-3">Tambah Nomor HP</h2>

                    <p className="text-gray-600 text-sm mb-5">
                        Gunakan nomor yang aktif dan dapat dihubungi.
                    </p>

                    <label className="text-sm font-medium text-gray-700">
                        Nomor HP
                    </label>

                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-1 focus:outline-none text-gray-800"
                        placeholder=""
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Pastikan nomor benar sebelum disimpan.
                    </p>

                    <button
                        disabled={phone.trim() === ""}
                        onClick={() => {
                            onSave(phone);
                            onClose();
                        }}
                        className={`w-full py-3 rounded-xl mt-6 font-semibold
                            ${
                                phone.trim() === ""
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-[color:var(--main-color)] text-white hover:bg-teal-700"
                            }`}
                    >
                        Simpan
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
