import { useState, useEffect } from "react";

const PickupOption = ({ onChange, deliveryMethods = [] }) => {
  const [option, setOption] = useState(deliveryMethods[0] || {});
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("Jl. Merdeka No. 10, Jakarta");
  const [selectedBranch, setSelectedBranch] = useState("Cabang EcoCycle - Jakarta Timur");

  // 🔹 kirim setiap kali data berubah ke parent
  useEffect(() => {
    if (onChange) {
      onChange(option);
    }
  }, [option, selectedAddress, selectedBranch]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <h3 className="font-semibold text-gray-800 mb-3">Metode Penyerahan</h3>

      <div className="space-y-3">
        {deliveryMethods && deliveryMethods.map((method) => {
          return (
            <label key={method.id} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="pickup"
                value={method.id}
                checked={option.id === method.id}
                onChange={() => setOption(method)}
                className="mt-1 w-5 h-5 text-teal-600 border-gray-300 focus:ring-teal-500"
              />
              <div>
                <span className="font-semibold text-gray-900">{method.name}</span>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Detail alamat */}
      <div className="mt-4">
        {!option?.is_self_service && (
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-teal-50 border border-teal-200 rounded-xl p-3 hover:bg-teal-100 transition"
          >
            <p className="text-sm text-gray-600">Alamat Penjemputan:</p>
            <p className="font-medium text-gray-800">{selectedAddress}</p>
          </div>
        )}

        {option?.is_self_service && (
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-teal-50 border border-teal-200 rounded-xl p-3 hover:bg-teal-100 transition"
          >
            <p className="text-sm text-gray-600">Cabang Tujuan:</p>
            <p className="font-medium text-gray-800">{selectedBranch}</p>
          </div>
        )}
      </div>

      {/* Modal Pilihan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
            <h4 className="text-lg font-semibold mb-4">
              {option === "kurir" ? "Pilih Alamat" : "Pilih Cabang"}
            </h4>

            {option === "kurir" ? (
              <div className="space-y-3">
                {[
                  "Jl. Merdeka No. 10, Jakarta",
                  "Jl. Sudirman No. 88, Bandung",
                  "Jl. Diponegoro No. 25, Surabaya",
                ].map((addr) => (
                  <div
                    key={addr}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowModal(false);
                    }}
                    className="p-3 border rounded-xl hover:border-teal-500 cursor-pointer"
                  >
                    {addr}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  "Cabang EcoCycle - Jakarta Timur",
                  "Cabang EcoCycle - Bandung",
                  "Cabang EcoCycle - Surabaya",
                ].map((branch) => (
                  <div
                    key={branch}
                    onClick={() => {
                      setSelectedBranch(branch);
                      setShowModal(false);
                    }}
                    className="p-3 border rounded-xl hover:border-teal-500 cursor-pointer"
                  >
                    {branch}
                  </div>
                ))}
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
