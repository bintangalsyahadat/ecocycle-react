import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

export default function RencanaSelesai() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <div className="p-6 pt-5">
        <h1 className="text-center mb-2 flex flex-wrap items-center justify-center gap-2 font-bold text-2xl sm:text-3xl">
          Perencanaan Berhasil Ditambahkan
          <img src="/images/ecoplanner/done.png" alt="icon" className="w-10 h-10" />
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Terima kasih! Perencanaanmu telah selesai diproses!
        </p>

        <div className="border rounded-2xl px-6 py-8 max-w-3xl mx-auto shadow-md relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div className="space-y-4">
              <Row label="Kategori" value="Plastik" />
              <Row label="Berat" value="8 kg" />
              <Row label="Cabang" value="Kediri" />
              <Row label="Tanggal" value="11/07/2025" />
              <Row label="Status" value="Berhasil" />

              <div className="flex items-center gap-3">
                <Row label="Foto" className="font-semibold flex items-center gap-2"></Row>
                <img
                  src=""
                  alt="foto"
                  className="w-24 h-24 rounded-lg object-cover border"
                />
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-2 w-55 h-48 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/ecoplanner/point.png"
                  alt="Foto"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-4xl text-[#00A8A8] font-semibold mt-1">+40</p>
            </div>

          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="border border-[#00A8A8] text-[#00A8A8] px-6 py-3 rounded-full w-full md:w-64 font-semibold hover:bg-[#00A8A8] hover:text-white transition"
          >
            Kembali ke Dashboard
          </button>

          <button
            onClick={() => navigate("/EcoPlanner")}
            className="bg-[#00A8A8] text-white px-6 py-3 rounded-full w-full md:w-64 font-semibold hover:opacity-80 transition"
          >
            Lihat Riwayat EcoPlanner
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[140px_10px_1fr] items-center text-lg py-1">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="font-bold">:</span>
      <span className="font-bold text-gray-800">{value}</span>
    </div>
  );
}


