import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

export default function EcoQuiz() {
  // Data pertanyaan
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
      q: "Siapa nama lengkap Fadhil?",
      options: ["Moh Fadhil Zanial Fahlevi", "Fadhil Zainal", "Muhammad Al Fadhil", "Fadhil Fahlevi"],
    },
  ];

  // Index pertanyaan sedang aktif
  const [index, setIndex] = useState(0);

  // Array jawaban user
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // Simpan jawaban saat dipilih
  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option; // simpan ke array sesuai nomor soal
    setAnswers(newAnswers);
  };

  // Next
  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  // Previous
  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-1">ECO Quiz</h2>
        <p className="text-gray-600 mb-4">Jawab pertanyaan berikut dan raih poin!</p>

        {/* CARD SOAL */}
        <div className="bg-cyan-100 p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            Pertanyaan {index + 1}/{questions.length}
          </p>

          {/* pertanyaan */}
          <h3 className="text-lg font-semibold mb-4">
            {questions[index].q}
          </h3>

          {/* pilihan */}
          <div className="space-y-3">
            {questions[index].options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-3 bg-white p-3 rounded-lg border cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name={`answer-${index}`}
                  value={opt}
                  checked={answers[index] === opt}  // << otomatis centang
                  onChange={() => handleSelect(opt)}
                  className="w-5 h-5"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* BUTTON NAVIGATION */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={index === 0}
            className="bg-teal-500 px-5 py-2 rounded-full text-white disabled:bg-gray-300"
          >
            Sebelumnya
          </button>

          <button
            onClick={nextQuestion}
            disabled={index === questions.length - 1}
            className="bg-teal-500 px-5 py-2 rounded-full text-white disabled:bg-gray-300"
          >
            Selanjutnya →
          </button>
        </div>

        {/* DEBUG (opsional): lihat jawaban tersimpan */}
        {/* <pre className="mt-4">{JSON.stringify(answers, null, 2)}</pre> */}
      </div>
    </div>
  );
}
