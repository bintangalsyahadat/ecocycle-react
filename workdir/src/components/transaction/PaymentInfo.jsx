import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function PaymentInfo({ payment }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 rounded-2xl"
      >
        <div className="text-left">
          <h3 className="font-semibold text-gray-800">Metode Pembayaran</h3>
          <p className="text-sm text-gray-600">
            {payment?.name || "-"}
          </p>
        </div>

        <ChevronDownIcon
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {open && (
        <div className="p-4 border-t border-gray-200 text-gray-700 space-y-3">
          <h4 className="font-medium text-gray-800">Tata Cara Pembayaran</h4>

          <div
            className="text-sm leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{
              __html: payment.instructions?.replace(/\n/g, "<br>") || "Tidak ada instruksi.",
            }}
          />

          {/* <p className="text-sm text-gray-600">1. Transfer ke nomor rekening berikut: ...</p>
          <p className="text-sm text-gray-600">2. Upload bukti pembayaran.</p> */}
        </div>
      )}
    </div>
  );
}
