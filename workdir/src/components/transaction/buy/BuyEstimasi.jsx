import { useState, useEffect } from "react";

export default function BuyEstimasi({ items, selectedPayment, onPaymentChange, readonly = false }) {
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
            <div className="space-y-2">
              {methods.map((method) => (
                <label
                  key={method}
                  className={`flex items-center justify-between border rounded-lg p-2 cursor-pointer hover:bg-gray-50 ${paymentMethod === method
                      ? "border-[var(--main-color)]"
                      : "border-gray-200"
                    }`}
                >
                  <span>{method}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => handleSelect(method)}
                    className="text-[var(--main-color)]"
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
