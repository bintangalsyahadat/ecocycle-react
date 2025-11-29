import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function Edukasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="px-6 py-6 max-w-5xl mx-auto">

        <div className="flex items-center gap-3 px-1 py-5">
          <button
            onClick={() => navigate(-1)}
            className="text-[#00A8A8] text-4xl"
          >
            ←
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">EcoDucation</h1>
            <p className="text-gray-500 text-sm">
              Pelajari cara memilah sampah rumah tangga dengan mudah!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-2xl p-8 shadow-sm">

            <h2 className="text-center font-semibold mb-6 text-lg">Jenis Sampah</h2>

            <div className="grid grid-cols-3 gap-4 text-center">

              <div className="rounded-xl bg-green-200 py-4 px-2">
                <img src="/images/ecoducation/organik.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">Organik</p>
                <p className="text-xs text-gray-700">Daun, buah</p>
              </div>

              <div className="rounded-xl bg-yellow-200 py-4 px-2">
                <img src="/images/ecoducation/anorganik.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">Anorganik</p>
                <p className="text-xs text-gray-700">Plastik, logam</p>
              </div>

              <div className="rounded-xl bg-orange-200 py-4 px-2">
                <img src="/images/ecoducation/battery.png" className="mx-auto w-12 h-12" />
                <p className="font-bold mt-2">B3</p>
                <p className="text-xs text-gray-700">Baterai, cairan</p>
              </div>

            </div>
          </div>
          <div className="border border-gray-300 rounded-2xl p-8 shadow-sm">

            <h2 className="text-center font-semibold mb-6 text-lg">Cara Memilah di Rumah</h2>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <img
                src="/images/ecoducation/memilah.png"
                className="w-28 h-28 object-contain"
              />

              <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
                <li>Gunakan 3 tong berbeda warna</li>
                <li>Pisahkan sejak di dapur atau tempat kerja</li>
                <li>Pastikan barang anorganik bersih sebelum dibuang</li>
              </ul>

            </div>
            <div className="text-center mt-10">
              <h3 className="font-semibold mb-2 text-lg">Manfaat Pemilahan</h3>
              <ul className=" text-left list-disc pl-5 text-sm text-gray-700 leading-relaxed space-y-1">
                <li>Mengurangi volume sampah ke TPA</li>
                <li>Membantu daur ulang</li>
                <li>Menghemat sumber daya</li>
              </ul>

            </div>

          </div>

        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/ecoducation/Quiz")}
            className="bg-[#00A8A8] text-white px-6 py-3 rounded-full w-full md:w-64 font-semibold hover:opacity-80 transition"
          >
            Lanjut ke ECO Quiz →
          </button>
        </div>


      </div>
    </div>
  );
}
