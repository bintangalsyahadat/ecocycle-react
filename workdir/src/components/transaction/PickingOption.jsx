import { useState, useEffect } from "react";
import { updateUserOperatingUnit } from "../../utils/api";

const PickupOption = ({ onChange, deliveryMethods = [], branches = [], currentUser = {}, type = "purchase" }) => {
  const [option, setOption] = useState(deliveryMethods[0] || {});
  const [showModal, setShowModal] = useState(false);
  const [methodModal, setMethodModal] = useState(false); // NEW: popup untuk metode

  const [selectedAddress, setSelectedAddress] = useState((currentUser?.address && currentUser?.address[0]) || {});
  const [selectedBranch, setSelectedBranch] = useState(
    branches.find(b => b.id === currentUser?.current_ou_id?.id) || {}
  );

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
