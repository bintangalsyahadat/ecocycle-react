import { useState, useEffect } from "react";

export default function BuyEstimasi({ items, paymentMethods, selectedPayment, onPaymentChange, readonly = false }) {
  const [paymentMethod, setPaymentMethod] = useState(selectedPayment || "");

  useEffect(() => {
    setPaymentMethod(selectedPayment || "");
  }, [selectedPayment]);

  const totalBerat = items.reduce((sum, i) => sum + (i.qty || 0), 0);
  const totalEstimasi = items.reduce(
    (sum, i) => sum + (i.qty || 0) * (i.price || 0),
    0
  );

  const methods = ["Transfer Bank", "COD (Bayar di Tempat)", "E-Wallet"];

  const handleSelect = (method) => {
    setPaymentMethod(method);
    onPaymentChange && onPaymentChange(method);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Estimasi Pembayaran
      </h2>

      <div className="text-sm">
        <div className="flex items-center justify-between mt-3">
          <p>Total Berat</p>
          <p className="font-semibold text-[var(--main-color)]">{totalBerat} kg</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <p>Total Estimasi Pembayaran</p>
          <p className="font-semibold text-[var(--main-color)]">
            Rp {totalEstimasi.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="mt-5">
          <p className="font-semibold text-gray-700 mb-2">Metode Pembayaran</p>

          {readonly ? (
            <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 font-medium">
              {selectedPayment || "Belum dipilih"}
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => {
                const isActive = paymentMethod?.id === method.id;

                return (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200
                      ${isActive
                        ? "border-[var(--main-color)] bg-[var(--main-color)]/10 shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full border transition-all duration-200
                          ${isActive
                            ? "bg-[var(--main-color)] border-[var(--main-color)]"
                            : "border-gray-300"
                          }`}
                      ></div>
                      <span className={`font-medium ${isActive ? "text-[var(--main-color)]" : "text-gray-700"}`}>
                        {method.name}
                      </span>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={isActive}
                      onChange={() => handleSelect(method)}
                      className="hidden"
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
