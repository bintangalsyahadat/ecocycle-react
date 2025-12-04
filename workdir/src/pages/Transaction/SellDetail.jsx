import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { fetchDeliveryMethod, fetchSellTransaction } from "../../utils/api";
import { useEffect, useState } from "react";
import CategoryCard from "../../components/transaction/CategoryCard";
import { formatDate } from "../../utils/formatted";
import { ArrowLeftIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import LoadingScreen from "../LoadingScreen";

function SellDetailPage({ currentUser, userLoading }) {
    const { noTransaction } = useParams();
    const [transaction, setTransaction] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTransactionDetail();
    }, [noTransaction]);

    const getTransactionDetail = async () => {
        const resTransaction = await fetchSellTransaction(noTransaction, currentUser.id);

        if (resTransaction?.delivery_method_id?.id) {
            const resDeliveryMethod = await fetchDeliveryMethod(resTransaction?.delivery_method_id?.id);
            if (resDeliveryMethod && resDeliveryMethod[0]) {
                resTransaction.delivery_method_id = resDeliveryMethod[0];
            }
        }
        setTransaction(resTransaction);

        if (resTransaction?.id) {
            setLoading(false);
        }
    }

    return (
        <div className="relative">
            {LoadingScreen(userLoading || loading || !currentUser)}

            <div className={`bg-[#F8F9FA] min-h-screen ${userLoading || loading || !currentUser ? "hidden" : ""}`}>
                <Navbar />

                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 mb-5 relative">
                    <div className="flex items-end justify-between mb-3">
                        <div>
                            <p className="text-lg md:text-2xl text-(--main-color) font-semibold">Detail Penyerahan</p>
                        </div>
                        <div>
                            <p className="text-xs hidden md:block font-semibold text-(--main-color)">Nomor Penyerahan</p>
                            <p className="text-lg md:text-2xl font-semibold text-gray-800">{transaction?.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-2 mb-2 flex flex-col">
                                <h2 className="text-base font-semibold text-gray-800">
                                    Kategori Sampah
                                </h2>
                            </div>
                            <div className="overflow-y-auto max-h-[50vh] space-y-3 lg:overflow-visible lg:max-h-none">
                                {transaction && transaction?.line_ids?.map((item) => (
                                    <CategoryCard
                                        key={item.id}
                                        name={item.waste_category_id.name}
                                        desc={item.waste_category_id?.description}
                                        image={item.waste_category_id?.image}
                                        price={item.unit_price}
                                        count={item.qty}
                                        readonly={true}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-5">
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Metode Penyerahan
                                </h3>

                                {transaction?.delivery_method_id?.is_self_service ? (
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {transaction?.delivery_method_id?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Cabang Tujuan: {transaction?.delivery_address_id?.name}
                                        </p>

                                        {transaction?.state == 'waiting_process' ? (
                                            <a
                                                href={`https://www.google.com/maps?q=${encodeURIComponent(
                                                    transaction?.operating_unit_id?.name
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-teal-600 font-medium hover:underline"
                                            >
                                                <MapPinIcon className="size-5" />
                                                Buka di Google Maps
                                            </a>
                                        ) : transaction?.state == 'purchased' && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl">
                                                <p className="font-semibold">Selesai</p>
                                                <p className="text-sm mt-1">Penyerahan mandiri Anda telah berhasil diproses.</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {transaction?.delivery_method_id?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Alamat Penjemputan: {transaction?.delivery_address_id?.name}
                                        </p>

                                        {transaction?.state == 'waiting_approval' ? (
                                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-xl">
                                                <div className="flex items-center gap-1 font-semibold">
                                                    <ClockIcon className="size-5" />
                                                    <span>Menunggu Konfirmasi</span>
                                                </div>
                                                <p className="text-sm mt-1">Menunggu konfirmasi untuk jadwal penjemputan.</p>
                                            </div>
                                        ) : transaction?.state == 'waiting_process' ? (
                                            <div className="bg-teal-50 border border-teal-200 text-teal-700 p-3 rounded-xl">
                                                <p className="font-semibold">Penjemputan Dijadwalkan</p>
                                                <p className="text-sm mt-1">
                                                    Kurir akan datang pada{" "}
                                                    <strong>{transaction?.scheduled_date ? formatDate(transaction?.scheduled_date) : "-"}</strong>.
                                                </p>
                                            </div>
                                        ) : transaction?.state == 'purchased' && (
                                            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl">
                                                <p className="font-semibold">Selesai</p>
                                                <p className="text-sm mt-1">Penjemputan telah berhasil diselesaikan.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Catatan
                                </h3>
                                {/* <div className="flex gap-2 overflow-x-auto mb-3">
                                {fotos && fotos.length > 0 ? (
                                    fotos.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Foto ${i + 1}`}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">Tidak ada foto</p>
                                )}
                            </div> */}
                                {transaction?.note ? (
                                    <p className="text-sm text-gray-600 italic">“{transaction?.note}”</p>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">
                                        Tidak ada catatan tambahan
                                    </p>
                                )}
                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Estimasi EcoCoin
                                </h2>
                                <div className="text-sm">
                                    <div className="flex items-center justify-between mt-3">
                                        <p>Total Estimasi Berat</p>
                                        <p className="font-semibold text-(--main-color)">
                                            {transaction?.line_ids?.reduce((sum, i) => sum + i.qty, 0)} kg
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <p>Total Estimasi EcoCoin</p>
                                        <div className="flex items-center font-semibold text-[color:var(--main-color)]">
                                            <img
                                                src="/images/ecopoint/coin.png"
                                                alt="coin"
                                                className="w-5 h-5 me-1"
                                            /> <p>{transaction?.estimate_total_amount?.toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {transaction?.state == 'purchased' && <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Total EcoCoin
                                </h2>
                                <div className="text-sm">
                                    <div className="flex items-center justify-between mt-3">
                                        <p>Total Berat Diterima</p>
                                        <p className="font-semibold text-(--main-color)">
                                            {transaction?.line_ids?.reduce((sum, i) => sum + i.valid_qty, 0)} kg
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 font-bold">
                                        <p>Total EcoCoin Didapatkan</p>
                                        <div className="flex text-lg items-center font-semibold text-[color:var(--main-color)]">
                                            <img
                                                src="/images/ecopoint/coin.png"
                                                alt="coin"
                                                className="w-5 h-5 me-1"
                                            /> <p>{transaction?.total_amount?.toLocaleString("id-ID")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
}


export default function SellDetail() {
    const { userLoggedIn, currentUser, loading } = useAuth();
    return !userLoggedIn ? <Navigate to="/login" replace /> : <SellDetailPage currentUser={currentUser} userLoading={loading} />;
}