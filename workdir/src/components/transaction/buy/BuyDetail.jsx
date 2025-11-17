import { useState } from "react";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import CategoryList from "../CategoryList";
import BuyEstimasi from "./BuyEstimasi";

export default function BuyDetail({ items = [], buyInfo = {}, onBack }) {
  const [validated, setValidated] = useState(false);

  const { metode = {}, catatan = "", metodePembayaran = "" } = buyInfo;

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-lg md:text-2xl text-[var(--main-color)] font-semibold">
            Detail Pembelian
          </p>
        </div>
        <div>
          <p className="text-xs hidden md:block font-semibold text-[var(--main-color)]">
            Nomor Pembelian
          </p>
          <p className="text-lg md:text-2xl font-semibold text-gray-800">
            #ECO-123456
          </p>
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
                    <p className="text-sm mt-1">
                      Menunggu konfirmasi untuk jadwal penjemputan.
                    </p>
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

         <BuyEstimasi items={items} selectedPayment={metodePembayaran} readonly={true} />

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-700 mb-2">Catatan</h3>
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
            className="w-full bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white font-semibold py-3 rounded-full transition"
          >
            {validated
              ? "Batalkan Validasi (Demo)"
              : "Simulasikan Validasi (Demo)"}
          </button>
        </div>
      </div>
    </div>
  );
}
