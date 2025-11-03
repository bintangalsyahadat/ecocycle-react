import { useState } from "react";
import { ArrowLeftIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import CategoryList from "../CategoryList";
import SellEstimasi from "./SellEstimasi";

export default function SellDetail({ items = [], sellInfo = {}, onBack }) {
  const [validated, setValidated] = useState(false);

  const totalEstimasi = items.reduce((sum, item) => sum + item.price * item.berat, 0);

  const { metode, catatan, fotos } = sellInfo;


  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-lg md:text-2xl text-(--main-color) font-semibold">Detail Penyerahan</p>
        </div>
        <div>
          <p className="text-xs hidden md:block font-semibold text-(--main-color)">Nomor Penyerahan</p>
          <p className="text-lg md:text-2xl font-semibold text-gray-800">#ECO-123456</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <CategoryList items={items} readonly={true} />

        <div className="w-full lg:w-1/2 space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              Metode Penyerahan
            </h3>
            {metode.method === "kurir" ? (
              <>
                <p className="font-medium text-gray-800">
                  Dijemput Kurir EcoCycle
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Alamat Penjemputan: {metode.address || "Belum diisi"}
                </p>

                {!validated ? (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-xl">
                    <div className="flex items-center gap-1 font-semibold">
                      <ClockIcon className="size-5" />
                      <span>Menunggu Konfirmasi</span>
                    </div>
                    <p className="text-sm mt-1">Menunggu konfirmasi untuk jadwal penjemputan.</p>
                  </div>
                ) : (
                  <div className="bg-teal-50 border border-teal-200 text-teal-700 p-3 rounded-xl">
                    <p className="font-semibold">Penjemputan Dijadwalkan</p>
                    <p className="text-sm mt-1">
                      Kurir akan datang pada{" "}
                      <strong>Senin, 4 Nov 2025, pukul 10:00</strong>.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="font-medium text-gray-800">
                  Diantar ke Cabang Terdekat
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Cabang Tujuan: {metode.branch || "Belum dipilih"}
                </p>

                {metode.branch && (
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      metode.branch
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-600 font-medium hover:underline"
                  >
                    <MapPinIcon className="size-5" />
                    Buka di Google Maps
                  </a>
                )}
              </>
            )}
          </div>

          <SellEstimasi items={items} />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 mb-2">
              Foto & Catatan
            </h3>
            <div className="flex gap-2 overflow-x-auto mb-3">
              {fotos && fotos.length > 0 ? (
                fotos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Foto ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400">Tidak ada foto</p>
              )}
            </div>
            {catatan ? (
              <p className="text-sm text-gray-600 italic">“{catatan}”</p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Tidak ada catatan tambahan
              </p>
            )}
          </div>

          <button
            onClick={() => setValidated(!validated)}
            className="w-full bg-(--main-color) hover:bg-(--main-color-hover) text-white font-semibold py-3 rounded-full transition"
          >
            {validated ? "Batalkan Validasi (Demo)" : "Simulasikan Validasi (Demo)"}
          </button>
        </div>
      </div>
    </div>
  );
}
