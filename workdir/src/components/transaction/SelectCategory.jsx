import CategoryCard from "./CategoryCard";

export default function SelectCategory({ categories, items, setItems, onNext }) {
  const updateCount = (key, value) => {
    setItems({ ...items, [key]: value });
  };

  const totalHarga = categories.reduce(
    (acc, cat) => acc + items[cat.name] * cat.purchase_price,
    0
  );

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5 relative">
        <div className="flex items-end justify-between md:mt-10 mb-6">
          <div>
            <p className="text-lg md:text-2xl text-(--main-color) font-semibold">Pilih Kategori Sampah</p>
            <p className="text-sm text-gray-500">
              Pilih kategori sampah dan jumlah qty (kg) sesuai bahan yang kamu mau jual.
              Harga tiap kategori berbeda!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {categories.map(cat => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              desc={cat.description}
              image={cat.image}
              price={cat.purchase_price}
              count={items[cat.name]}
              setCount={val => updateCount(cat.name, val)}
            />
          ))}
        </div>

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="bg-white border-t border-gray-200 shadow-lg rounded-full py-4 px-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Estimasi Total</p>
              <p className="text-xl font-bold text-(--main-color)">
                Rp {totalHarga.toLocaleString("id-ID")}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="bg-(--main-color) hover:bg-(--main-color-hover) disabled:bg-(--main-color-disable) cursor-pointer text-white font-semibold px-6 py-3 rounded-full transition"
              disabled={totalHarga === 0}
            >
              LANJUTKAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
