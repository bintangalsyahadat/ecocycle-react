import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createAddress, fetchCountry, fetchCountryState } from "../utils/api";

export default function AddAddress({ currentUser, open, onClose, onSaved }) {
  const [step, setStep] = useState(1);

  // FORM STATE
  const [form, setForm] = useState({
    parent_id: currentUser?.id,
    name: "",
    phone: "",
    street: "",
    city: "",
    state_id: "",
    country_id: "",
    zip: "",
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // COUNTRY & STATE
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  // LOADING STATE
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      loadCountries();
    }
  }, [open]);

  // Fetch Country
  const loadCountries = async () => {
    setLoadingCountry(true);

    const data = await fetchCountry("Indonesia");

    const list =
      data?.data?.records ||
      data?.data ||
      (Array.isArray(data) ? data : []) ||
      [];

    const indo = list.find(
      (c) => (c.name || c.display_name)?.toLowerCase() === "indonesia"
    );

    if (indo) {
      updateForm("country_id", indo.id);
      loadStates(indo.id);
    }

    setLoadingCountry(false);
  };

  // Fetch Provinsi
  const loadStates = async (countryId) => {
    setLoadingState(true);

    const data = await fetchCountryState(countryId, "");

    const list =
      data?.data?.records ||
      data?.data ||
      (Array.isArray(data) ? data : []) ||
      [];

    setStates(list);
    setLoadingState(false);
  };

  // VALIDATION STEP
  const validateStep1 = () => {
    if (!form.name) return alert("Nama alamat wajib diisi.");
    if (!form.state_id) return alert("Provinsi wajib dipilih.");
    if (!form.city) return alert("Kota wajib diisi.");
    return true;
  };

  const validateStep2 = () => {
    if (!form.street) return alert("Alamat jalan wajib diisi.");
    if (!form.zip) return alert("Kode pos wajib diisi.");
    if (!form.phone) return alert("Nomor telepon wajib diisi.");
    return true;
  };

  // SUBMIT FINAL
  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setSubmitting(true);

    try {
      await createAddress(form);

      onSaved();
      onClose();
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Gagal menyimpan alamat.");
    }

    setSubmitting(false);
  };

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
              <button onClick={onClose} className="text-gray-400 text-xl">×</button>
            </div>

            {/* PROGRESS BAR */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex-1 h-1 rounded ${step >= 1 ? "bg-[var(--main-color)]" : "bg-gray-300"}`} />
              <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? "bg-[var(--main-color)]" : "bg-gray-300"}`} />
              <div className={`flex-1 h-1 rounded ${step >= 3 ? "bg-[var(--main-color)]" : "bg-gray-300"}`} />
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <h3 className="text-lg font-medium mb-3">Masukkan Alamat</h3>

                <input
                  type="text"
                  placeholder="Nama Alamat *"
                  className="w-full border rounded-lg p-3 mb-3"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Kota *"
                  className="w-full border rounded-lg p-3 mb-3"
                  value={form.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                />

                <select
                  className="w-full border rounded-lg p-3 mb-3"
                  value={selectedState}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedState(val);
                    updateForm("state_id", val);
                  }}
                >
                  {loadingState && <option>Loading provinsi...</option>}

                  {!loadingState && (
                    <>
                      <option value="">Pilih Provinsi *</option>
                      {states?.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </>
                  )}
                </select>

                <button
                  onClick={() => validateStep1() && setStep(2)}
                  className="w-full cursor-pointer bg-[var(--main-color)] text-white py-3 rounded-xl hover:bg-[var(--main-color-hover)]"
                >
                  Lanjut
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <h3 className="text-lg font-medium mb-3">Detail Alamat</h3>

                <input
                  type="text"
                  placeholder="Nama Jalan / Gedung *"
                  className="w-full border p-3 rounded-lg mb-3"
                  value={form.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Kode Pos *"
                  className="w-full border p-3 rounded-lg mb-3"
                  value={form.zip}
                  onChange={(e) => updateForm("zip", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Nomor Telepon *"
                  className="w-full border p-3 rounded-lg mb-3"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 cursor-pointer bg-gray-300 text-black py-3 rounded-xl hover:bg-gray-400"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={() => validateStep2() && setStep(3)}
                    className="flex-1 cursor-pointer bg-[var(--main-color)] text-white py-3 rounded-xl hover:bg-[var(--main-color-hover)]"
                  >
                    Lanjut
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                <h3 className="text-lg font-medium mb-3">Konfirmasi</h3>

                <p className="text-gray-600 mb-4">
                  Pastikan semua data sudah benar sebelum menyimpan.
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 cursor-pointer bg-gray-300 text-black py-3 rounded-xl hover:bg-gray-400"
                  >
                    Kembali
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`flex-1 cursor-pointer py-3 rounded-xl text-white ${
                      submitting
                        ? "bg-gray-400"
                        : "bg-[var(--main-color)] hover:bg-[var(--main-color-hover)]"
                    }`}
                  >
                    {submitting ? "Menyimpan..." : "Simpan Alamat"}
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
