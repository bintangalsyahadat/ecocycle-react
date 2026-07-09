import { useState, useEffect } from "react";
import { updateUserOperatingUnit, createAddress } from "../../utils/api";
import { useAuth } from "../../contexts/authContext";

const PickupOption = ({ onChange, deliveryMethods = [], branches = [], currentUser = {}, type = "purchase" }) => {
  const { refreshUser } = useAuth();
  const [option, setOption] = useState(deliveryMethods[0] || {});
  const [showModal, setShowModal] = useState(false);
  const [methodModal, setMethodModal] = useState(false); // NEW: popup untuk metode

  const [selectedAddress, setSelectedAddress] = useState((currentUser?.address && currentUser?.address[0]) || {});
  const [selectedBranch, setSelectedBranch] = useState(
    branches.find(b => b.id === currentUser?.current_ou_id?.id) || {}
  );

  // ——— Tambah Alamat ———
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", street: "", city: "", state: "", country: "", zip: "",
  });

  const resetForm = () => {
    setForm({ name: "", phone: "", street: "", city: "", state: "", country: "", zip: "" });
    setFormError("");
    setFormSuccess("");
  };

  const setField = (f, v) => { setForm(p => ({ ...p, [f]: v })); setFormError(""); };

  const handleSaveAddress = async () => {
    const { name, street, city, state, country } = form;
    if (!name.trim() || !street.trim() || !city.trim() || !state.trim() || !country.trim()) {
      setFormError("Mohon isi: Nama, Jalan, Kota, Provinsi, dan Negara.");
      return;
    }
    setSaving(true); setFormError("");
    try {
      const result = await createAddress({
        parent_id: currentUser?.id,
        name: name.trim(),
        phone: form.phone.trim() || undefined,
        street: street.trim(),
        city: city.trim(),
        state_id: state.trim(),
        country_id: country.trim(),
        zip: form.zip.trim() || undefined,
      });
      if (result?.id) {
        setFormSuccess("Alamat berhasil ditambahkan!");
        await refreshUser();
        setTimeout(() => { setShowAddForm(false); resetForm(); }, 1000);
      } else {
        setFormError("Gagal menyimpan. Coba lagi.");
      }
    } catch (e) {
      setFormError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  // Kirim setiap update ke parent
  useEffect(() => {
    if (onChange) {
      onChange({
        method: option,
        address: selectedAddress,
        branch: selectedBranch,
      });
    }
  }, [option, selectedAddress, selectedBranch]);

  // Update user OU only once
  useEffect(() => {
    if (selectedBranch) updateUserBranch();
  }, [selectedBranch]);

  const updateUserBranch = async () => {
    const userOU = currentUser?.current_ou_id?.id;

    if (userOU !== selectedBranch.id) {
      const updatedUser = await updateUserOperatingUnit(currentUser, selectedBranch);
      const newUserOU = updatedUser?.current_ou_id?.id;

      if (!newUserOU) {
        alert("Fail to update location branch");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      {/* ============================
          JUDUL
      ============================= */}
      <h3 className="font-semibold text-gray-800 mb-3">
        Metode {type === "purchase" ? "Penyerahan" : "Pengiriman"}
      </h3>

      {/* ============================
          PILIH METODE (Jika purchase, radio normal)
          Jika bukan purchase → pilih lewat modal
      ============================= */}
      {type === "purchase" ? (
        // Normal (radio button)
        <div className="space-y-3">
          {deliveryMethods.map((method) => (
            <label key={method.id} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="pickup"
                checked={option.id === method.id}
                onChange={() => setOption(method)}
                className="mt-1 w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
              />
              <div>
                <span className="font-semibold text-gray-900">
                  {method.is_self_service ? "Diambil Sendiri" : method.name} {/* NEW */}
                </span>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </label>
          ))}
        </div>
      ) : (
        // NON-PURCHASE: Klik → pop up pilih metode
        <div
          className="p-3 border rounded-xl bg-teal-50 hover:bg-teal-100 cursor-pointer"
          onClick={() => setMethodModal(true)}
        >
          <p className="text-sm text-gray-600">Metode {type === "purchase" ? "Penyerahan" : "Pengiriman"}:</p>
          <p className="font-semibold text-gray-800 mt-1">
            {option?.is_self_service ? "Diambil Sendiri" : option?.name}
          </p>
        </div>
      )}

      {/* ============================
          PILIH ALAMAT ATAU CABANG
      ============================= */}
      <div className="mt-4">
        {!option?.is_self_service && (
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-teal-50 border border-teal-200 rounded-xl p-3 hover:bg-teal-100 transition"
          >
            <p className="text-sm text-gray-600">Alamat {type === "purchase" ? "Penjemputan" : "Tujuan"}:</p>
            {selectedAddress?.street ? (
              <>
                <p className="font-bold text-gray-800 mb-1">{selectedAddress.name}</p>
                <p className="text-xs text-gray-800">
                  {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state_id?.name},{" "}
                  {selectedAddress.country_id?.name}
                </p>
              </>
            ) : (
              <p className="font-medium text-gray-800 text-red-500">Belum memilih alamat</p>
            )}
          </div>
        )}

        {option?.is_self_service && (
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-teal-50 border border-teal-200 rounded-xl p-3 hover:bg-teal-100 transition"
          >
            <p className="text-sm text-gray-600">Cabang Tujuan:</p>
            {selectedBranch?.name ? (
              <>
                <p className="font-bold text-gray-800 mb-1">{selectedBranch.name}</p>
                <p className="text-xs text-gray-800">
                  {selectedBranch.address?.street}, {selectedBranch.address?.city},{" "}
                  {selectedBranch.address?.state_id?.name}, {selectedBranch.address?.country_id?.name}
                </p>
              </>
            ) : (
              <p className="font-medium text-gray-800 text-red-500">Belum memilih cabang</p>
            )}
          </div>
        )}
      </div>

      {/* ============================
          MODAL PILIH METODE (NEW)
      ============================= */}
      {methodModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md space-y-3 max-h-[60vh] overflow-y-auto">
            <h4 className="text-lg font-semibold mb-3">Pilih Metode {type === "purchase" ? "Penyerahan" : "Pengiriman"}</h4>

            {deliveryMethods.map((method) => {
              const active = option?.id === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => {
                    setOption(method);
                    setMethodModal(false);
                  }}
                  className={`p-3 border rounded-xl cursor-pointer ${
                    active
                      ? "bg-(--main-color) text-white border-(--main-color)"
                      : "hover:border-(--main-color) hover:border-2"
                  }`}
                >
                  <p className="font-bold">
                    {method.is_self_service ? "Diambil Sendiri" : method.name}
                  </p>
                  {/* <p className={`text-xs ${active ? "text-white" : "text-gray-600"}`}>
                    {method.description}
                  </p> */}
                </div>
              );
            })}

            <button
              className="mt-2 w-full bg-gray-100 py-2 rounded-xl hover:bg-gray-200"
              onClick={() => setMethodModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ============================
          MODAL ALAMAT / CABANG
      ============================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative max-h-[42vh] flex flex-col">
            <h4 className="text-lg font-semibold mb-4">
              {option?.is_self_service ? "Pilih Cabang" : "Pilih Alamat"}
            </h4>

            {!option?.is_self_service && (
              <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
                {currentUser?.address?.map((addr) => {
                  const active = selectedAddress?.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowModal(false);
                      }}
                      className={`p-3 border rounded-xl cursor-pointer transition ${
                        active
                          ? "bg-(--main-color) text-white border-(--main-color)"
                          : "hover:border-(--main-color) hover:border-2"
                      }`}
                    >
                      <p className="font-bold mb-1">{addr.name}</p>
                      <p className={`text-xs ${active ? "text-white" : "text-gray-600"}`}>
                        {addr.street}, {addr.city}, {addr.state_id?.name}, {addr.country_id?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {option?.is_self_service && (
              <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
                {branches.map((branch) => {
                  const active = selectedBranch?.id === branch.id;
                  return (
                    <div
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranch(branch);
                        setShowModal(false);
                      }}
                      className={`p-3 border rounded-xl cursor-pointer ${
                        active
                          ? "bg-(--main-color) text-white font-bold"
                          : "hover:border-(--main-color) hover:border-2"
                      }`}
                    >
                      <p className="font-bold mb-1">{branch.name}</p>
                      <p className={`text-xs ${active ? "text-white" : "text-gray-600"}`}>
                        {branch.address?.street}, {branch.address?.city},{" "}
                        {branch.address?.state_id?.name}, {branch.address?.country_id?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ——— Tambah Alamat / Form ——— */}
            {!option?.is_self_service && (
              <>
                {!showAddForm ? (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="mt-3 w-full border-2 border-dashed border-(--main-color) text-(--main-color) font-medium py-2 rounded-xl hover:bg-green-50 transition cursor-pointer"
                  >
                    + Tambah Alamat
                  </button>
                ) : (
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Nama *</label>
                        <input value={form.name} onChange={e => setField("name", e.target.value)}
                          placeholder="Contoh: Rumah" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">No. Telepon</label>
                        <input value={form.phone} onChange={e => setField("phone", e.target.value)}
                          placeholder="08xxx" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Jalan *</label>
                      <input value={form.street} onChange={e => setField("street", e.target.value)}
                        placeholder="Jl. Merdeka No. 10" className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Kota *</label>
                        <input value={form.city} onChange={e => setField("city", e.target.value)}
                          placeholder="Jakarta" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Kode Pos</label>
                        <input value={form.zip} onChange={e => setField("zip", e.target.value)}
                          placeholder="12345" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Provinsi *</label>
                        <input value={form.state} onChange={e => setField("state", e.target.value)}
                          placeholder="DKI Jakarta" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Negara *</label>
                        <input value={form.country} onChange={e => setField("country", e.target.value)}
                          placeholder="Indonesia" className="w-full border rounded-lg px-3 py-2 text-sm" />
                      </div>
                    </div>

                    {formError && <p className="text-red-500 text-xs">{formError}</p>}
                    {formSuccess && <p className="text-green-600 text-xs">{formSuccess}</p>}

                    <div className="flex gap-2">
                      <button onClick={() => { setShowAddForm(false); resetForm(); }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-xl text-sm cursor-pointer">
                        Batal
                      </button>
                      <button onClick={handleSaveAddress} disabled={saving}
                        className="flex-1 bg-(--main-color) hover:bg-(--main-color-hover) text-white font-medium py-2 rounded-xl text-sm cursor-pointer disabled:opacity-60">
                        {saving ? "Menyimpan..." : "Simpan"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-xl"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupOption;
