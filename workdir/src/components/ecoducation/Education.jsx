import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Education() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA] from-white to-teal-50">
      <Navbar />

      <div className="px-6 py-6 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 px-1 py-5"
        >
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer text-[color:var(--main-color)] text-4xl hover:-translate-x-1 transition"
          >
            ←
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">EcoDucation</h1>
            <p className="text-gray-500 text-sm">
              Pelajari cara memilah sampah rumah tangga dengan mudah!
            </p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Kategori Sampah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl p-8 border border-[color:var(--main-color)] bg-white/80 shadow-md backdrop-blur-md"
          >
            <h2 className="text-center font-semibold mb-6 text-lg text-gray-700">
              Jenis Sampah
            </h2>

            <div className="grid grid-cols-3 gap-4 text-center">

              {/* Organik */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-xl bg-green-200 py-4 px-2 shadow-sm"
              >
                <img src="/images/ecoducation/organik.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">Organik</p>
                <p className="text-xs text-gray-700">Daun, buah</p>
              </motion.div>

              {/* Anorganik */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-xl bg-yellow-200 py-4 px-2 shadow-sm"
              >
                <img src="/images/ecoducation/anorganik.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">Anorganik</p>
                <p className="text-xs text-gray-700">Plastik, logam</p>
              </motion.div>

              {/* B3 */}
              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-xl bg-orange-200 py-4 px-2 shadow-sm"
              >
                <img src="/images/ecoducation/battery.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">B3</p>
                <p className="text-xs text-gray-700">Baterai, cairan</p>
              </motion.div>

            </div>
          </motion.div>

          {/* Cara Memilah */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl p-8 border border-[color:var(--main-color)] bg-white/80 shadow-md backdrop-blur-md"
          >
            <h2 className="text-center font-semibold mb-6 text-lg text-gray-700">
              Cara Memilah di Rumah
            </h2>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <motion.img
                src="/images/ecoducation/memilah.png"
                className="w-28 h-28 object-contain drop-shadow-md"
                initial={{ rotate: -4, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
                <li>Gunakan 3 tong berbeda warna</li>
                <li>Pisahkan sejak di dapur atau tempat kerja</li>
                <li>Pastikan barang anorganik bersih sebelum dibuang</li>
              </ul>
            </div>

            <div className="text-center mt-10">
              <h3 className="font-semibold mb-2 text-lg text-gray-700">Manfaat Pemilahan</h3>

              <ul className="text-left list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
                <li>Mengurangi volume sampah ke TPA</li>
                <li>Membantu daur ulang</li>
                <li>Menghemat sumber daya</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/ecoducation/Quiz")}
            className="cursor-pointer bg-[#00A8A8] text-white px-6 py-3 rounded-full w-full md:w-64 font-semibold shadow-md hover:bg-[#009090] transition"
          >
            Lanjut ke ECO Quiz →
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
