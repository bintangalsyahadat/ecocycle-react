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
  sellInfo,
  setSellInfo,
  onNext,
  deliveryMethods = []
}) {
  const [note, setNote] = useState(sellInfo.note || "");
  const [photos, setPhotos] = useState(sellInfo.photos || []);
  const [metode, setMetode] = useState(sellInfo.metode || {});
  const [loading, setLoading] = useState(false);

  const totalEstimasi = items.reduce(
    (sum, i) => sum + (i.qty || 0) * (i.price || 0),
    0
  );

  const updateCount = (name, val) => updateItem(name, val);

  useEffect(() => {
    if (totalEstimasi === 0) onBack();
  }, [totalEstimasi]);

  const handleNext = async () => {
    if (!metode?.id) {
      alert("Pilih metode penyerahan terlebih dahulu");
      return;
    }

    setLoading(true);

    setSellInfo({
      ...sellInfo,
      metode,
      note,
      photos: photos.map((f) => f.url),
    });

    try {
      await onNext(); // jalankan API submit
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan transaksi");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
      <div className="flex items-end justify-between md:mt-10 mb-3">
        <div className="flex items-center">
          <button
            onClick={() => !loading && onBack()}
            className={`text-(--main-color) font-medium cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
        <CategoryList items={items} onUpdateCount={updateCount} />

        <div className="w-full lg:w-1/2 h-fit">
          <PickupOption
            onChange={(val) => setMetode(val)}
            deliveryMethods={deliveryMethods}
          />

          <SellEstimasi items={items} />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
            <SellNote
              sellInfo={sellInfo}
              onChangePhoto={setPhotos}
              onChangeNote={setNote}
            />

            <div>
              <button
                onClick={handleNext}
                disabled={loading}
                className={`w-full text-white font-semibold px-6 py-3 rounded-full transition 
                  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-(--main-color) hover:bg-(--main-color-hover) cursor-pointer"}
                `}
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


