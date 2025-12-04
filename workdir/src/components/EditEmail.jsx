import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function EditEmail({ open, onClose, currentEmail, onSave }) {
    const [email, setEmail] = useState(currentEmail || "");

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
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-3">Ubah Email</h2>

                    <p className="text-gray-600 text-sm mb-5">
                        Email digunakan untuk keamanan akun dan pemulihan password.
                    </p>

                    <label className="text-sm font-medium text-gray-700">Email Baru</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-1 focus:outline-none text-gray-800"
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Pastikan email aktif dan dapat diakses.
                    </p>

                    <button
                        disabled={email.trim() === ""}
                        onClick={() => {
                            onSave(email);
                            onClose();
                        }}
                        className={`w-full py-3 rounded-xl mt-6 font-semibold
                            ${email.trim() === "" 
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                                : "bg-teal-600 text-white hover:bg-teal-700"}
                        `}
                    >
                        Simpan
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
