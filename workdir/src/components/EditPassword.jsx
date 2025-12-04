import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditPassword({ open, onClose, onSave }) {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");

    if (!open) return null;

    const disabled = oldPass.trim() === "" || newPass.trim() === "";

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
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    {/* TITLE */}
                    <h2 className="text-2xl font-semibold mb-4">
                        Ubah Kata Sandi
                    </h2>

                    {/* INPUT KATA SANDI LAMA */}
                    <label className="text-sm font-medium text-gray-700">
                        Kata Sandi Lama
                    </label>
                    <input
                        type="password"
                        className="w-full border rounded-xl p-3 mt-1 mb-4 focus:outline-none"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                    />

                    {/* INPUT KATA SANDI BARU */}
                    <label className="text-sm font-medium text-gray-700">
                        Kata Sandi Baru
                    </label>
                    <input
                        type="password"
                        className="w-full border rounded-xl p-3 mt-1 mb-4 focus:outline-none"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />

                    <button
                        disabled={disabled}
                        onClick={() => {
                            onSave({ oldPass, newPass });
                            onClose();
                        }}
                        className={`w-full py-3 rounded-xl mt-4 font-semibold
                            ${disabled
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
