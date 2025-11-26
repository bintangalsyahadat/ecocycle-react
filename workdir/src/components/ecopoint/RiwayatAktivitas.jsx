import { FaSearch, FaCoins } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function RiwayatAktivitas() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("Semua");

    const data = [
        { tanggal: "27 Okt 2025", aktivitas: "Check-in Harian", poin: "+10", status: "Berhasil" },
        { tanggal: "26 Okt 2025", aktivitas: 'Tukar Voucher "Diskon 10%"', poin: "-100", status: "Berhasil" },
        { tanggal: "25 Okt 2025", aktivitas: "Quiz EcoDucation", poin: "+40", status: "Berhasil" },
        { tanggal: "23 Okt 2025", aktivitas: "Point Kadaluarsa", poin: "-20", status: "Kadaluarsa" },
    ];

    const filters = ["Semua", "Dapat", "Ditukar", "Kadaluarsa"];

    return (
        <div className="min-h-screen bg-[#E6F2EF]">
            <Navbar />

            <div className="px-6 max-w-7xl mx-auto pt-3 pb-10">
                <h1 className="text-3xl font-bold text-gray-800">Riwayat Aktivitas</h1>
                <p className="text-gray-500 mt-1">
                    Lihat semua aktivitas pointmu - Checkin, reward, dan transaksi lainnya
                </p>

                <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((item) => (
                            <button
                                key={item}
                                onClick={() => setFilter(item)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition 
                  ${filter === item
                                        ? "bg-teal-600 text-white"
                                        : "border border-teal-600 text-teal-600 hover:bg-teal-50"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center w-full md:w-80">
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-teal-500"
                            placeholder="Cari riwayat transaksi anda"
                        />
                        <button className="ml-2 text-teal-600 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white shadow rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3 text-left">Tanggal</th>
                                    <th className="p-3 text-left">Aktivitas</th>
                                    <th className="p-3 text-left">Jumlah Poin</th>
                                    <th className="p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="border-b hover:bg-teal-50 transition cursor-pointer"
                                    >
                                        <td className="p-3">{item.tanggal}</td>
                                        <td className="p-3">{item.aktivitas}</td>
                                        <td className="p-3 font-bold text-teal-600 flex items-center gap-1">
                                            <FaCoins /> {item.poin}
                                        </td>
                                        <td className="p-3">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="py-3 text-center text-gray-600">
                            &lt; 1 2 3 4 &gt;
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-xl p-5">
                        <h2 className="text-lg font-bold text-gray-700">Ringkasan Poin bulan ini</h2>
                        <hr className="my-3" />

                        <div className="flex justify-between py-2 text-gray-700 items-center">
                            <span>Point didapat</span>
                            <span className="font-bold text-teal-600 flex items-center gap-1">
                                1250 <FaCoins className="text-teal-600" />
                            </span>
                        </div>

                        <div className="flex justify-between py-2 text-gray-700 items-center">
                            <span>Point digunakan</span>
                            <span className="font-bold text-teal-600 flex items-center gap-1">
                                750 <FaCoins className="text-teal-600" />
                            </span>
                        </div>

                        <div className="flex justify-between py-2 text-gray-700 items-center">
                            <span>Total Point</span>
                            <span className="font-bold text-teal-600 flex items-center gap-1">
                                7777 <FaCoins className="text-teal-600" />
                            </span>
                        </div>

                        <button
                            onClick={() => navigate("/Eco/EcoPoint")}
                            className="mt-4 w-full py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                        >
                            Kembali ke Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
