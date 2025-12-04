import { motion, AnimatePresence } from "framer-motion";

export default function Withdraw({ open, onClose }) {
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
                    className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Withdraw Coin
                        </h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-500 text-xl hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>

                    {/* INPUT JUMLAH */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <img src="/images/ecopoint/coin.png" className="w-5 h-5" />
                            <span className="text-gray-900 font-medium">Coin: 0</span>
                        </div>
                        <label className="text-sm font-medium text-gray-700">
                            Jumlah Coin
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan jumlah coin"
                            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                    </div>

                    {/* PILIH METODE */}
                    <div className="mb-5">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Pilih Metode Penarikan
                        </p>

                        <div className="space-y-2">
                            <button className="w-full border rounded-xl p-3 flex items-center justify-between hover:bg-gray-200">
                                <span>DANA</span>
                                <span className="text-xl"></span>
                            </button>

                            <button className="w-full border rounded-xl p-3 flex items-center justify-between hover:bg-gray-200">
                                <span>GoPay</span>
                                <span className="text-xl"></span>
                            </button>
                        </div>
                    </div>

                    {/* BUTTON CONFIRM */}
                    <button className="w-full cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700">
                        Konfirmasi
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
