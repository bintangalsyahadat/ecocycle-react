import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MapView from "../components/MapView";

export default function AddAddress({ open, onClose, onSaved }) {
  const [step, setStep] = useState(1);

  return (
    <AnimatePresence>
      {open && (
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
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tambah Alamat</h2>
              <button onClick={onClose} className="text-gray-400 text-xl">
                ×
              </button>
            </div>

            {/* PROGRESS BAR */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex-1 h-1 rounded ${step >= 1 ? "bg-[color:var(--main-color)]" : "bg-gray-300"}`}></div>
              <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? "bg-[color:var(--main-color)]" : "bg-gray-300"}`}></div>
              <div className={`flex-1 h-1 rounded ${step >= 3 ? "bg-[color:var(--main-color)]" : "bg-gray-300"}`}></div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-medium mb-3">Masukkan Alamat</h3>

                <input type="text" placeholder="Provinsi" className="w-full border rounded-lg p-3 mb-3" />
                <input type="text" placeholder="Kabupaten/Kota" className="w-full border rounded-lg p-3 mb-3" />
                <input type="text" placeholder="Kecamatan" className="w-full border rounded-lg p-3 mb-3" />
                <input type="text" placeholder="Kelurahan/Desa" className="w-full border rounded-lg p-3 mb-3" />

                <button
                  onClick={() => setStep(2)}
                  className="w-full cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700"
                >
                  Lanjut
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-medium mb-3">Detail Alamat</h3>

                <input
                  type="text"
                  placeholder="Nama Jalan / Gedung / Kompleks"
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                  type="text"
                  placeholder="Detail (Patokan, Lantai, Blok, dll)"
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700"
                  >
                    Lanjut
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-lg font-medium mb-3">Konfirmasi</h3>

                <p className="text-gray-600 mb-4">
                  Pastikan data alamat sudah benar sebelum menyimpan.
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={() => {
                      onSaved();
                      onClose();
                    }}
                    className="flex-1 cursor-pointer bg-[color:var(--main-color)] text-white py-3 rounded-xl hover:bg-teal-700"
                  >
                    Simpan Alamat
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
