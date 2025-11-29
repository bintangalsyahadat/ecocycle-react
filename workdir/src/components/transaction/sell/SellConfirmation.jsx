import { useEffect, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import CategoryList from "../CategoryList";
import SellNote from "./SellNote";
import PickupOption from "../PickingOption";
import SellEstimasi from "./SellEstimasi";

export default function SellConfirmation({
  items = [],
  onBack,
  updateItem,
  onNext,
  deliveryMethods = [],
  branches = [],
  currentUser = {},
  catatan,
  fotos,
  setCatatan,
  setFotos,
}) {
  const [loading, setLoading] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  const totalEstimasi = items.reduce(
    (sum, i) => sum + (i.qty || 0) * (i.price || 0),
    0
  );

  useEffect(() => {
    if (totalEstimasi === 0) onBack();
  }, [totalEstimasi]);

  const handleNext = async () => {
    if (!selectedDeliveryMethod?.method?.id) {
      alert("Pilih metode penyerahan terlebih dahulu");
      return;
    }

    setLoading(true);

    const finalData = {
      deliveryMethod: selectedDeliveryMethod.method,
      deliveryAddress: selectedDeliveryMethod.address,
      branch: selectedDeliveryMethod.branch,
      note: catatan,
      photos: fotos.map((f) => f.url),
    };

    try {
      await onNext(finalData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
      <div className="flex items-end justify-between md:mt-10 mb-3">
        <div className="flex items-center">
          <button
            onClick={() => !loading && onBack()}
            className={`text-(--main-color) font-medium cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <ArrowLeftCircleIcon aria-hidden="true" className="size-6 me-1" />
          </button>
          <p className="text-lg md:text-2xl text-(--main-color) font-semibold">
            Konfirmasi Penyerahan
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <CategoryList items={items} onUpdateCount={updateItem} />

        <div className="w-full lg:w-1/2 h-fit">
          <PickupOption
            onChange={(val) => setSelectedDeliveryMethod(val)}
            deliveryMethods={deliveryMethods}
            branches={branches}
            currentUser={currentUser}
          />

          <SellEstimasi items={items} />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
            <SellNote
              note={catatan}
              onChangeNote={setCatatan}
              photos={fotos}
              onChangePhoto={setFotos}
            />

            <div>
              <button
                onClick={handleNext}
                disabled={loading}
                className={`w-full text-white font-semibold px-6 py-3 rounded-full transition 
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-(--main-color) hover:bg-(--main-color-hover) cursor-pointer"
                  }`}
              >
                {loading ? "Menyimpan..." : "Konfirmasi Penyerahan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
