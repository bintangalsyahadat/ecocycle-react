import { useState } from "react";
import Navbar from "/src/components/navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const sampleRows = [
    { date: "27 Okt 2025", activity: "Jual", points: "+10", status: "Berhasil" },
    { date: "26 Okt 2025", activity: "Beli", points: "-100", status: "Berhasil" },
    { date: "25 Okt 2025", activity: "Jual", points: "+40", status: "Berhasil" },
    { date: "23 Okt 2025", activity: "Beli", points: "-20", status: "Kadaluwarsa" },
];

export default function TransactionHistory() {
    const [activeTab, setActiveTab] = useState("Semua");
    const [query, setQuery] = useState("");

    const tabs = ["Semua", "Jual", "Beli"];
    const navigate = useNavigate();

    // Filter rows by tab and search query (simple contains)
    const filtered = sampleRows.filter((r) => {
        const matchesTab = activeTab === "Semua" ? true : r.activity === activeTab;
        const matchesQuery =
            query.trim() === "" ||
            r.date.toLowerCase().includes(query.toLowerCase()) ||
            r.activity.toLowerCase().includes(query.toLowerCase()) ||
            r.points.toLowerCase().includes(query.toLowerCase()) ||
            r.status.toLowerCase().includes(query.toLowerCase());
        return matchesTab && matchesQuery;
    });

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Riwayat Transaksi</h1>
                <p className="text-gray-500 mb-6">
                    Lihat semua aktivitas transaksimu - jual, beli, dan transaksi lain
                </p>

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                    <div className="bg-white rounded-md shadow-sm w-full lg:w-auto">
                        <div className="px-2 py-2">
                            <nav className="flex space-x-2">
                                {tabs.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-md focus:outline-none transition ${activeTab === t
                                            ? "text-[color:var(--main-color)]"
                                            : "text-gray-600 hover:text-gray-800"
                                            }`}
                                        aria-current={activeTab === t ? "page" : undefined}
                                    >
                                        {t}
                                        <span
                                            className={`absolute left-0 right-0 -bottom-2 h-1 rounded-t-md transition-all ${activeTab === t ? "bg-[color:var(--main-color)]" : "bg-transparent"
                                                }`}
                                            style={{ width: activeTab === t ? "60%" : "0%", margin: "0 auto" }}
                                        />
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <label className="relative block">
                            <span className="sr-only">Cari riwayat</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari riwayat transaksi anda"
                                className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-sm placeholder-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                🔍
                            </span>
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b">
                                <div className="grid grid-cols-4 gap-4 text-gray-600 font-semibold text-sm">
                                    <div>Tanggal</div>
                                    <div>Aktivitas</div>
                                    <div className="text-center">Jumlah Poin</div>
                                    <div className="text-right">Status</div>
                                </div>
                            </div>

                            <div>
                                {filtered.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">Tidak ada data</div>
                                ) : (
                                    filtered.map((row, idx) => (
                                        <div
                                            key={idx}
                                            className={`px-6 py-5 border-b last:border-b-0 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                }`}
                                        >
                                            <div className="grid grid-cols-4 gap-4 items-center text-sm text-gray-700">
                                                <div>{row.date}</div>
                                                <div>{row.activity}</div>
                                                <div className="flex items-center justify-center space-x-2">
                                                    <img
                                                        src="/images/ecopoint/point.png"
                                                        alt="Point Icon"
                                                        className="w-10 h-10 object-contain"
                                                    />

                                                    <span className={`text-sm ${row.points.startsWith("+") ? "text-[color:var(--main-color)]" : "text-red-500"}`}>
                                                        {row.points}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${row.status === "Berhasil"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                            }`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="px-6 py-4">
                                <div className="flex items-center justify-center text-sm text-gray-600 space-x-3">
                                    <button className="px-2">{"<"}</button>
                                    <div className="flex space-x-2">
                                        <button className="px-2 font-medium">1</button>
                                        <button className="px-2 hover:underline">2</button>
                                        <button className="px-2 hover:underline">3</button>
                                        <button className="px-2 hover:underline">4</button>
                                        <button className="px-2">10</button>
                                    </div>
                                    <button className="px-2">{">"}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Ringkasan Transaksi bulan ini</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">Point didapat</div>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src="/images/ecopoint/point.png"
                                            alt="Point Icon"
                                            className="w-10 h-10 object-contain"
                                        />
                                        <span className="text-[color:var(--main-color)] font-bold">1250</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-gray-600">Point digunakan</div>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src="/images/ecopoint/point.png"
                                            alt="Point Icon"
                                            className="w-10 h-10 object-contain"
                                        />
                                        <span className="text-[color:var(--main-color)] font-bold">750</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t pt-3">
                                    <div className="text-gray-600 font-medium">Total Point</div>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src="/images/ecopoint/point.png"
                                            alt="Point Icon"
                                            className="w-12 h-12 object-contain"
                                        />
                                        <span className="text-[color:var(--main-color)] font-extrabold text-lg">7777</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="mt-6 w-full cursor-pointer bg-[color:var(--main-color)] hover:bg-[color:var(--main-color)] text-white py-3 rounded-lg font-semibold">
                                Kembali ke Dashboard
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
