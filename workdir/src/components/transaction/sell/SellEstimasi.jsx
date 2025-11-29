

export default function SellEstimasi({ items }) {

    const totalEstimasi = items.reduce(
        (sum, i) => sum + (i.qty || 0) * (i.price || 0), 0
    );

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Estimasi Pembayaran
            </h2>
            <div className="text-sm">
                <div className="flex items-center justify-between mt-3">
                    <p>Total Berat</p>
                    <p className="font-semibold text-(--main-color)">
                        {items.reduce((sum, i) => sum + i.qty, 0)} kg
                    </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <p>Total Estimasi Pembayaran</p>
                    <p className="font-semibold text-(--main-color)">
                        Rp {totalEstimasi.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </div>
    )
}