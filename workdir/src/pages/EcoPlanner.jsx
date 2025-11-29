import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";


export default function EcoPlanner() {
    const history = [
        { date: "27 Okt 2025", item: "Botol, 5kg", point: "+10", location: "ECO Cycle Sentono" },
        { date: "26 Okt 2025", item: "Botol, 5kg", point: "-100", location: "ECO Cycle Sentono" },
        { date: "25 Okt 2025", item: "Botol, 5kg", point: "+40", location: "ECO Cycle Sentono" },
        { date: "23 Okt 2025", item: "Botol, 5kg", point: "-20", location: "ECO Cycle Sentono" },
    ];
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white pb-10">

            <Navbar />

            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5">
                <button
                    onClick={() => navigate(-1)}
                    className="text-[#00A8A8] text-4xl"
                >
                    ←
                </button>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">EcoPlanner</h1>
                    <p className="text-gray-500 text-sm">Yuk, Jadwalkan Penjualan Sampahmu!</p>
                </div>
            </div>

            {/* Search */}
            <div className="px-6 my-3">
                <input
                    type="text"
                    placeholder="Cari riwayat ECO Planner anda"
                    className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-[#00A8A8]"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-2">

                {/* Table */}
                <div className="border rounded-xl overflow-hidden shadow-sm lg:col-span-2">
                    <div className="grid grid-cols-4 bg-gray-100 p-3 text-sm font-semibold text-gray-700">
                        <p>Tanggal</p>
                        <p>Barang & Berat</p>
                        <p>Poin</p>
                        <p>Lokasi</p>
                    </div>

                    {history.map((item, i) => (
                        <div key={i} className="grid grid-cols-4 p-3 text-sm border-b items-center">
                            <p>{item.date}</p>
                            <p className="flex items-center gap-2">
                                <img src="/public/images/ecoplanner/cup.png" className="w-10" />
                                {item.item}
                            </p>
                            <p className="flex items-center gap-1 text-[#00A8A8] font-semibold">
                                <img src="/public/images/ecoplanner/point.png" className="w-10" /> {item.point}
                            </p>
                            <p className="text-gray-500">{item.location}</p>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center py-3 gap-3 text-gray-600">
                        {["<", 1, 2, 3, 4, ">"].map((p, i) => (
                            <button key={i} className="hover:text-[#00A8A8]">{p}</button>
                        ))}
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="border rounded-xl shadow-sm p-6 h-fit">
                    <h3 className="font-semibold text-gray-700 text-center mb-4">
                        Ringkasan Planner bulan ini
                    </h3>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <p>Planner dilakukan</p>
                            <p className="text-[#00A8A8] font-bold">5x</p>
                        </div>

                        <div className="flex justify-between">
                            <p>Point didapat</p>
                            <p className="text-[#00A8A8] font-bold flex items-center gap-1">
                                <img src="/public/images/ecoplanner/point.png" className="w-7" /> 750
                            </p>
                        </div>

                        <div className="pt-3 border-t">
                            <p className="text-center font-semibold text-gray-700">Total Point</p>

                            <p className="text-[#00A8A8] text-3xl font-bold flex justify-center items-center gap-2 mt-1">
                                <img src="/public/images/ecoplanner/point.png" className="w-10" />
                                7777
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/ecoplanner/RencanaBaru")}
                        className="w-full bg-[#00A8A8] text-white font-semibold rounded-full py-2 mt-6 hover:bg-[#008C8C]"
                    >
                        Tambahkan Planner +
                    </button>

                </div>
            </div>
        </div>
    );
}
