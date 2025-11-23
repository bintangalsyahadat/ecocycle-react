import { useEffect, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import CategoryList from "../CategoryList";
import BuyNote from "./BuyNote";
import PickupOption from "../PickingOption";
import BuyEstimasi from "./BuyEstimasi";

export default function BuyConfirmation({
  items = [],
  onBack,
  updateItem,
  buyInfo,
  setBuyInfo,
  onNext,
}) {
  const [note, setNote] = useState(buyInfo.note || "");
  const [photos, setPhotos] = useState(buyInfo.photos || []);
  const [metode, setMetode] = useState(buyInfo.metode || "");
  const [paymentMethod, setPaymentMethod] = useState(buyInfo.metodePembayaran || "");
  const [showWarning, setShowWarning] = useState(false);

  const totalEstimasi = items.reduce(
    (sum, i) => sum + (i.qty || 0) * (i.price || 0),
    0
  );

  const updateCount = (name, val) => updateItem(name, val);

  useEffect(() => {
    if (totalEstimasi === 0) onBack();
  }, [totalEstimasi]);

  const handleNext = () => {
    if (!paymentMethod) {
      setShowWarning(true);
      return;
    }
    setBuyInfo({
      ...buyInfo,
      metode,
      note,
      metodePembayaran: paymentMethod,
      photos: photos.map((f) => f.url),
    });
    onNext();
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
      <div className="flex items-end justify-between md:mt-10 mb-3">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="text-[var(--main-color)] font-medium cursor-pointer"
          >
            <ArrowLeftCircleIcon aria-hidden="true" className="size-6 me-1" />
          </button>
          <p className="text-lg md:text-2xl text-[var(--main-color)] font-semibold">
            Konfirmasi Pembelian
          </p>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row gap-6">
        <CategoryList items={items} onUpdateCount={updateCount} />

        <div className="w-full lg:w-1/2 h-fit">
          <PickupOption value={metode} onChange={(val) => setMetode(val)} />

          <BuyEstimasi
            items={items}
            selectedPayment={paymentMethod}
            onPaymentChange={(method) => {
              setPaymentMethod(method);
              setShowWarning(false);
            }}
            readonly={false}
          />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
            <BuyNote
              buyInfo={buyInfo}
              onChangePhoto={setPhotos}
              onChangeNote={setNote}
            />

            <div className="space-y-2">
              <button
                onClick={handleNext}
                disabled={!paymentMethod}
                className={`w-full font-semibold px-6 py-3 rounded-full transition ${paymentMethod
                  ? "bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Konfirmasi Pembelian
              </button>

              {showWarning && !paymentMethod && (
                <p className="text-red-500 text-sm text-center font-medium mt-1">
                  ⚠️ Silakan pilih metode pembayaran terlebih dahulu.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
