import { FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function SyaratKetentuan({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-2xl shadow-xl relative">

              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={onClose}
              >
                <FaXmark className="text-2xl" />
              </button>

              <h2 className="text-2xl font-bold text-center mb-4">
                Syarat & Ketentuan
              </h2>

              <ol className="list-decimal ml-5 space-y-2 text-gray-700 text-sm">
                <li>Berlaku hanya dalam periode yang telah ditentukan; voucher yang sudah kedaluwarsa tidak dapat digunakan.</li>
                <li>Setiap voucher hanya dapat digunakan satu kali per akun dan tidak dapat dipindah­tangankan.</li>
                <li>Voucher tidak dapat digabung dengan promo lain, kecuali jika dinyatakan sebaliknya.</li>
                <li>Voucher dapat ditukar dengan potongan harga, produk, layanan, atau donasi; tidak dapat diuangkan atau dikembalikan.</li>
                <li>Voucher donasi akan memberikan bukti digital melalui akun pengguna.</li>
                <li>Tidak berlaku untuk barang terlarang, non-ramah lingkungan, atau di luar mitra resmi.</li>
                <li>Maksimal tiga (3) kali penukaran voucher diperbolehkan per akun setiap bulan.</li>
                <li>EcoCycle berhak membatalkan transaksi apabila ditemukan indikasi penyalahgunaan.</li>
                <li>Syarat dan ketentuan ini dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</li>
              </ol>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
