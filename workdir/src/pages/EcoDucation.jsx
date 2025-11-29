import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";


export default function EcoDucation() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800">EcoDucation</h1>
        <p className="text-gray-600 mt-2">
          Yuk, Belajar daur ulang dan uji pengetahuanmu tentang lingkungan!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Edukasi Pemilahan Sampah */}
          <div className="border-2 border-teal-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex flex-col items-center text-center">
              <div className="text-teal-600 text-7xl mb-4"><img src="/images/ecoducation/trash.png" alt="icon" className="w-25 h-25 object-contain" /></div>
              <h2 className="text-xl font-semibold text-gray-800">
                Edukasi Pemilahan Sampah
              </h2>
              <p className="text-gray-600 mt-2">
                Pelajari cara memilah sampah dan best practice daur ulang
              </p>
              <button
                onClick={() => navigate("/ecoducation/Edukasi")}
                className="mt-5 bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition">
                Pelajari lebih lanjut →
              </button>
            </div>
          </div>

          {/* Eco Quiz */}
          <div className="border-2 border-teal-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex flex-col items-center text-center">
              <div className="text-teal-600 text-7xl mb-4"><img src="/images/ecoducation/quiz.png" alt="icon" className="w-22 h-22 object-contain" /></div>
              <h2 className="text-xl font-semibold text-gray-800">Eco Quiz</h2>
              <p className="text-gray-600 mt-2">
                Uji pengetahuanmu tentang lingkungan dan kumpulkan ECOPoint
              </p>
              <button
                onClick={() => navigate("/ecoducation/Quiz")}
                className="mt-5 bg-teal-600 text-white px-5 py-2 rounded-full hover:bg-teal-700 transition">
                Mulai Quiz Sekarang →
              </button>
            </div>
          </div>
        </div>

        {/* Total Point */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white border rounded-full px-6 py-3 shadow text-teal-700 font-semibold flex items-center gap-3">
            <img
              src="/images/ecoplanner/point.png"
              alt="icon"
              className="w-11 h-11 object-contain"
            />
            Total poin kamu : 9 ECO Point
          </div>

        </div>
      </div>
    </div>
  );
}
