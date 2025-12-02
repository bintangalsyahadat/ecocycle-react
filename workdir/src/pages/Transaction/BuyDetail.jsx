import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/navbar/Navbar";
import { fetchDeliveryMethod, fetchBuyTransaction } from "../../utils/api";
import { useEffect, useState } from "react";
import CategoryCard from "../../components/transaction/CategoryCard";
import { formatDate } from "../../utils/formatted";
import { ArrowLeftIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import PaymentInfo from "../../components/transaction/PaymentInfo";

function BuyDetailPage({ currentUser }) {
    const { noTransaction } = useParams();
    const [transaction, setTransaction] = useState({});

    useEffect(() => {
        getTransactionDetail();
    }, [noTransaction]);

    const getTransactionDetail = async () => {
        const resTransaction = await fetchBuyTransaction(noTransaction, currentUser?.id);

        if (resTransaction?.delivery_method_id?.id) {
            const resDeliveryMethod = await fetchDeliveryMethod(resTransaction?.delivery_method_id?.id);
            if (resDeliveryMethod && resDeliveryMethod[0]) {
                resTransaction.delivery_method_id = resDeliveryMethod[0];
            }
        }
        setTransaction(resTransaction);
    }

    return (
        <div className="bg-[#F8F9FA] min-h-screen">
            <Navbar />

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 mb-5 relative">
                <div className="flex items-end justify-between mb-3">
                    <div>
                        <p className="text-lg md:text-2xl text-(--main-color) font-semibold">Detail Pembelian</p>
                    </div>
                    <div>
                        <p className="text-xs hidden md:block font-semibold text-(--main-color)">Nomor Pembelian</p>
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
                                    type={"buy"}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 space-y-5">
                        <>
                            {transaction?.state === "waiting_payment" && (
                                <div className="p-3 rounded-xl bg-yellow-50 border border-gray-200 text-gray-700">
                                    <p className="font-semibold">Menunggu Pembayaran</p>
                                    <p className="text-sm mt-1">Silakan selesaikan pembayaran untuk melanjutkan transaksi.</p>
                                </div>
                            )}

                            {transaction?.state === "waiting_process" && (
                                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
                                    <p className="font-semibold">Sedang Dikirim</p>
                                    <p className="text-sm mt-1">Kurir sedang dalam perjalanan mengantarkan pesanan Anda.</p>
                                </div>
                            )}

                            {transaction?.state === "sale" && (
                                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700">
                                    <p className="font-semibold">Transaksi Selesai</p>
                                    <p className="text-sm mt-1">Pesanan telah diterima.</p>
                                </div>
                            )}

                            {transaction?.state === "cancel" && (
                                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600">
                                    <p className="font-semibold">Dibatalkan</p>
                                    <p className="text-sm mt-1">Pesanan ini telah dibatalkan.</p>
                                </div>
                            )}
                        </>

                        {transaction?.state === "waiting_payment" && transaction?.payment_ids?.[0]?.xendit_checkout_url && <button
                            onClick={() => window.location.replace(transaction.payment_ids[0].xendit_checkout_url)}
                            className={`w-full font-semibold px-6 py-3 rounded-full transition bg-[var(--main-color)] hover:bg-[var(--main-color-hover)] text-white cursor-pointer`}
                        >
                            Bayar Sekarang
                        </button>}

                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">

                            {/* Title */}
                            <h3 className="font-semibold text-gray-800 text-lg">
                                Metode Pengiriman
                            </h3>

                            {/* Delivery Method */}
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-teal-50 border border-teal-200">
                                    🚚
                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">
                                        {transaction?.delivery_method_id?.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        2 - 4 hari setelah diproses
                                    </p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Alamat Tujuan</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {transaction?.delivery_address_id?.street},
                                    {" "}{transaction?.delivery_address_id?.city},
                                    {" "}{transaction?.delivery_address_id?.state_id?.name},
                                    {" "}{transaction?.delivery_address_id?.country_id?.name}
                                </p>
                            </div>

                        </div>


                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                            <h3 className="font-semibold text-gray-700 mb-2">
                                Catatan
                            </h3>
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
                                Total Pembayaran
                            </h2>
                            <div className="text-sm">
                                <div className="flex items-center justify-between mt-3">
                                    <p>Metode Pembayaran</p>
                                    <p className="">
                                        {transaction?.payment_method_id?.name}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <p>Total Berat</p>
                                    <p className="font-semibold text-(--main-color)">
                                        {transaction?.line_ids?.reduce((sum, i) => sum + i.qty, 0)} kg
                                    </p>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <p>Total Pembayaran</p>
                                    <p className="font-semibold text-(--main-color)">
                                        Rp {transaction?.total_amount?.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}


export default function BuyDetail() {
    const { userLoggedIn, currentUser } = useAuth();
    return !userLoggedIn ? <Navigate to="/login" replace /> : <BuyDetailPage currentUser={currentUser} />;
}