import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function Quiz() {
  // Data soal
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
        answers[index + 1] === correctAnswers[index + 1] ? true : answers[index + 1] ? false : null
      );
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsCorrect(
        answers[index - 1] === correctAnswers[index - 1] ? true : answers[index - 1] ? false : null
      );
    }
  };

  const score = answers.filter((ans, i) => ans === correctAnswers[i]).length;
  const reward = score * 5;
  const totalPoint = 7777 + reward;


  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-4">Hasil ECO Quiz</h2>
          <p className="text-gray-600 mb-6">Lihat hasil quizmu dan claim ECO Pointmu!</p>

          <div className="bg-cyan-100 rounded-xl p-8 shadow-md border">
            <div className="flex justify-center mb-4">
              <img src="/public/images/ecoducation/achievement.png" alt="medal" className="w-16" />
            </div>

            <p className="text-center text-lg font-semibold mb-2">
              Kamu menjawab{" "}
              <span className="text-teal-600">{score}</span> dari{" "}
              <span className="text-teal-600">{questions.length}</span> soal dengan benar!
            </p>

            <div className="w-full bg-gray-300 h-3 rounded-full my-5">
              <div
                className="bg-teal-500 h-3 rounded-full"
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>

            <p className="text-center text-gray-700">
              Selamat! Kamu mendapatkan{" "}
              <span className="text-teal-600 font-semibold">+ {reward} ECO Point</span>
            </p>

            <div className="flex justify-center mt-1">
              <img
                src="/public/images/ecoplanner/point.png"
                alt="eco poin"
                className="w-19 h-20"
              />
            </div>

            <p className="text-center mt-1 text-gray-700">
              Total ECO Point kamu sekarang adalah{" "}
              <span className="text-teal-600 font-semibold">{totalPoint} ECO Point</span>
            </p>

            <div className="flex justify-center mt-6">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full shadow hover:bg-teal-600">
                Klaim ECO Point
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-1">ECO Quiz</h2>
        <p className="text-gray-600 mb-4">Jawab pertanyaan berikut dan raih poin!</p>
        <div className="bg-cyan-100 p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            Pertanyaan {index + 1}/{questions.length}
          </p>

          <h3 className="text-lg font-semibold mb-4">{questions[index].q}</h3>
          <div className="space-y-3">
            {questions[index].options.map((opt, i) => {
              const userAnswer = answers[index];
              const correct = correctAnswers[index];

              let style = "bg-white border hover:bg-gray-100";
              if (userAnswer) {
                if (opt === userAnswer) {
                  style =
                    opt === correct
                      ? "bg-green-400 border-green-500"
                      : "bg-red-400 border-red-500";
                } else if (opt === correct) {
                  style = "bg-green-300 border-green-400";
                }
              }

              return (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${style}`}
                >
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleSelect(opt)}
                    disabled={answers[index] !== null && answers[index] !== correctAnswers[index]}
                    className="w-5 h-5"
                  />

                  {opt}
                </label>
              );
            })}
          </div>

          {isCorrect !== null && (
            <p
              className={`mt-4 font-bold ${isCorrect ? "text-green-600" : "text-red-600"
                }`}
            >
              {isCorrect ? "Benar!" : "Salah!"}
            </p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={index === 0}
            className="bg-teal-500 px-5 py-2 rounded-full text-white disabled:bg-gray-300"
          >
            Sebelumnya
          </button>

          <button
            onClick={() => {
              if (index === questions.length - 1) {
                setIsFinished(true);
              } else {
                nextQuestion();
              }
            }}
            className="bg-teal-500 px-5 py-2 rounded-full text-white"
          >
            {index === questions.length - 1 ? "Lihat Hasil" : "Selanjutnya →"}
          </button>
        </div>
      </div>
    </div>
  );
}
