import CategoryCard from "./CategoryCard";


export default function CategoryList({ items, onUpdateCount, readonly }) {
    return (
        <div className="w-full lg:w-1/2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-2 mb-2 flex flex-col">
                <h2 className="text-base font-semibold text-gray-800">
                    Kategori Sampah
                </h2>
            </div>
            <div className="overflow-y-auto max-h-[50vh] space-y-3 lg:overflow-visible lg:max-h-none">
                {items.map((item) => (
                    <CategoryCard
                        key={item.name}
                        name={item.name}
                        desc={item.description}
                        image={item.image}
                        price={item.price}
                        count={item.qty}
                        setCount={(val) => onUpdateCount(item.name, val)}
                        readonly={readonly}
                    />
                ))}
            </div>
        </div>
    )
}