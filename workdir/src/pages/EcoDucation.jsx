import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EcoDucation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FA] from-white to-teal-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">EcoDucation</h1>
          <p className="text-gray-600 mt-2 text-lg">
            Yuk, belajar daur ulang dan uji pengetahuanmu tentang lingkungan!
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* EDUKASI CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-6 border border-[color:var(--main-color)] bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/ecoducation/Education")}
          >
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/ecoducation/trash.png"
                alt="icon"
                className="w-24 h-24 mb-4 drop-shadow-md"
              />

              <h2 className="text-2xl font-semibold text-gray-800">
                Edukasi Pemilahan Sampah
              </h2>
              <p className="text-gray-600 mt-2">
                Pelajari cara memilah sampah dan best practice daur ulang
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-6 bg-[color:var(--main-color)] text-white px-6 py-2 rounded-full hover:bg-teal-700 transition font-medium"
              >
                Learn More →
              </motion.button>
            </div>
          </motion.div>

          {/* QUIZ CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-6 border border-[color:var(--main-color)] bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate("/ecoducation/Quiz")}
          >
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/ecoducation/quiz.png"
                alt="icon"
                className="w-24 h-24 mb-4 drop-shadow-md"
              />

              <h2 className="text-2xl font-semibold text-gray-800">
                Eco Quiz
              </h2>
              <p className="text-gray-600 mt-2">
                Uji pengetahuanmu tentang lingkungan dan kumpulkan ECOPoint
              </p>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-6 bg-[color:var(--main-color)] text-white px-6 py-2 rounded-full hover:bg-teal-700 transition font-medium"
              >
                Start Quiz Now →
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* POINT DISPLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/90 border rounded-full px-8 py-4 shadow-md backdrop-blur-md text-teal-700 font-semibold flex items-center gap-4"
          >
            <img
              src="/images/ecopoint/point.png"
              alt="icon"
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg">Total poin : 9 ECO Point</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
