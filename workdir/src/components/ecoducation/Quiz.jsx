import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const questions = [
    {
      q: "Apa warna tong sampah untuk sampah organik?",
      options: ["Hijau", "Biru", "Merah", "Kuning"],
    },
    {
      q: "Apa bahan yang dapat didaur ulang?",
      options: ["Kaca", "Batu", "Styrofoam", "Kayu Basah"],
    },
    {
      q: "Berapa lama plastik terurai?",
      options: ["20 hari", "1 tahun", "450 tahun", "1 minggu"],
    },
    {
      q: "Apa langkah pertama paling penting sebelum sampah didaur ulang?",
      options: [
        "Memilah sampah berdasarkan jenisnya",
        "Menghancurkan sampah menjadi debu",
        "Mencuci sampah dengan sabun",
        "Membakar semua sampah",
      ],
    },
    {
      q: "Sampah elektronik seperti baterai bekas termasuk limbah?",
      options: ["Organik", "Residu", "Kompos", "B3"],
    },
  ];

  const correctAnswers = [
    "Hijau",
    "Kaca",
    "450 tahun",
    "Memilah sampah berdasarkan jenisnya",
    "B3",
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
    setIsCorrect(option === correctAnswers[index]);
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setIsCorrect(
        answers[index + 1] === correctAnswers[index + 1]
          ? true
          : answers[index + 1]
          ? false
          : null
      );
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsCorrect(
        answers[index - 1] === correctAnswers[index - 1]
          ? true
          : answers[index - 1]
          ? false
          : null
      );
    }
  };

  const score = answers.filter((ans, i) => ans === correctAnswers[i]).length;
  const reward = score * 5;
  const totalPoint = 7777 + reward;

  // ==========================================================================================
  //  HALAMAN HASIL QUIZ
  // ==========================================================================================
  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] from-white to-teal-50">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-4 py-10"
        >
          <h2 className="text-2xl font-bold mb-4">Hasil ECO Quiz</h2>
          <p className="text-gray-600 mb-6">Berikut hasil yang kamu peroleh!</p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-[color:var(--main-color)]"
          >
            <div className="flex justify-center mb-4">
              <motion.img
                src="/images/ecoducation/achievement.png"
                alt="medal"
                className="w-20"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </div>

            <p className="text-center text-lg font-semibold mb-2">
              Kamu menjawab{" "}
              <span className="text-[color:var(--main-color)]">{score}</span> dari{" "}
              <span className="text-[color:var(--main-color)]">{questions.length}</span> soal dengan benar!
            </p>

            {/* Progress bar */}
            <div className="w-full bg-gray-300 h-3 rounded-full my-5">
              <motion.div
                className="bg-[color:var(--main-color)] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(score / questions.length) * 100}%`,
                }}
                transition={{ duration: 1 }}
              />
            </div>

            <p className="text-center text-gray-700">
              Selamat! Kamu mendapatkan{" "}
              <span className="text-[color:var(--main-color)] font-semibold">+ {reward} ECO Point</span>
            </p>

            <div className="flex justify-center mt-1">
              <img src="/images/ecopoint/point.png" alt="eco poin" className="w-20" />
            </div>

            <p className="text-center mt-1 text-gray-700">
              Total ECO Point kamu sekarang:{" "}
              <span className="text-[color:var(--main-color)] font-semibold">{totalPoint} ECO Point</span>
            </p>

            <div className="flex justify-center mt-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[color:var(--main-color)] text-white px-6 py-3 rounded-full shadow hover:bg-[color:var(--main-color)]"
              >
                Klaim ECO Point
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ==========================================================================================
  //  HALAMAN QUIZ
  // ==========================================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-1">ECO Quiz</h2>
        <p className="text-gray-600 mb-4">Jawab pertanyaan berikut dan raih poin!</p>

        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-teal-200"
        >
          <p className="text-sm text-gray-600 font-semibold mb-2">
            Pertanyaan {index + 1}/{questions.length}
          </p>

          <h3 className="text-lg font-semibold mb-4">{questions[index].q}</h3>

          <div className="space-y-3">
            {questions[index].options.map((opt, i) => {
              const userAnswer = answers[index];
              const correct = correctAnswers[index];

              let style =
                "bg-white border hover:bg-gray-100 transition rounded-lg shadow-sm";

              if (userAnswer) {
                if (opt === userAnswer) {
                  style =
                    opt === correct
                      ? "bg-green-400 border-green-500 text-white"
                      : "bg-red-400 border-red-500 text-white";
                } else if (opt === correct) {
                  style = "bg-green-300 border-green-400 text-white";
                }
              }

              return (
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  key={i}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${style}`}
                >
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleSelect(opt)}
                    className="w-5 h-5"
                  />
                  {opt}
                </motion.label>
              );
            })}
          </div>

          {isCorrect !== null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 font-bold ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Benar!" : "Salah!"}
            </motion.p>
          )}
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={index === 0}
            onClick={prevQuestion}
            className="cursor-pointer bg-[color:var(--main-color)] px-5 py-2 rounded-full text-white disabled:bg-gray-300"
          >
            Sebelumnya
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (index === questions.length - 1) {
                setIsFinished(true);
              } else nextQuestion();
            }}
            className="cursor-pointer bg-[color:var(--main-color)] px-5 py-2 rounded-full text-white"
          >
            {index === questions.length - 1 ? "Lihat Hasil" : "Selanjutnya →"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
