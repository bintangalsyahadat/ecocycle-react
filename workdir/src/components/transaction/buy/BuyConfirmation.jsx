import { useEffect, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import CategoryList from "../CategoryList";
import BuyNote from "./BuyNote";
import PickupOption from "../PickingOption";
import BuyEstimasi from "./BuyEstimasi";

export default function BuyConfirmation({
  items = [],
  deliveryMethods = [],
  paymentMethods = [],
  onBack,
  updateItem,
  buyInfo,

  onChangeNote,
  onChangePhoto,
  onChangeMetode,
  onChangePayment,

  onNext,

  branches = [],
  currentUser = {}
}) {
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
    if (!buyInfo.paymentMethod?.id) {
      setShowWarning(true);
      return;
    }
    onNext();
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">

      {/* Header */}
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

        {/* Category List */}
        <CategoryList items={items} onUpdateCount={updateCount} />

        <div className="w-full lg:w-1/2 h-fit">

          {/* Delivery Method */}
          <PickupOption
            value={buyInfo.metode}
            onChange={onChangeMetode}
            deliveryMethods={deliveryMethods}
            branches={branches}
            currentUser={currentUser}
            type="sell"
          />

          {/* Payment */}
          <BuyEstimasi
            items={items}
            selectedPayment={buyInfo.paymentMethod}
            paymentMethods={paymentMethods}
            onPaymentChange={(method) => {
              onChangePayment(method);
            }}
          />

          {/* Note */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
            <BuyNote
              buyInfo={buyInfo}
              onChangePhoto={onChangePhoto}
              onChangeNote={onChangeNote}
            />

            {/* Button */}
            <div className="space-y-2">
              <button
                onClick={handleNext}
                className={`
                  w-full font-semibold px-6 py-3 rounded-full transition
                  ${
                    buyInfo.paymentMethod?.id
                      ? "bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white"
                      : "bg-gray-300 text-gray-600 cursor-pointer"
                  }
                `}
              >
                Konfirmasi Pembelian
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL WARNING */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-lg">
            <p className="text-lg font-semibold mb-2 text-red-500">
              Metode Pembayaran Belum Dipilih
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Silakan pilih metode pembayaran terlebih dahulu untuk melanjutkan.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="w-full py-2 rounded-xl bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white font-medium"
            >
              Oke, mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
