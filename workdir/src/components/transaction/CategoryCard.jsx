import { useEffect, useState } from "react";

export default function CategoryCard({ name, desc, image, count, setCount, price, readonly }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (count < 0) setCount(0);
        setTotal(count * price);

    }, [count, price]);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex">
                <div className={"size-24 shrink-0 overflow-hidden rounded-md " + (image ? "" : "border border-gray-200")}>
                    {image ? (
                        <img
                            src={`data:image/jpeg;base64,${image}`}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="size-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>
                                {name}
                            </h3>
                            <p className="ml-4 text-sm">
                                Rp {price?.toLocaleString("id-ID")} /kg
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{desc}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        {!readonly ? (
                            <div className="flex items-center justify-between mt-3">
                                <button
                                    onClick={() => setCount(Math.max(count - 1, 0))}
                                    className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="font-semibold text-gray-800 mx-3">{count} kg</span>
                                <button
                                    onClick={() => setCount(count + 1)}
                                    className="bg-(--main-color) text-white text-xs px-2 py-1 rounded-full cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <div className="mt-3 text-right text-sm text-gray-600">
                                Jumlah :{" "}
                                <span className="font-semibold text-(--main-color)">{count} kg</span>
                            </div>
                        )}

                        <div className="mt-3 text-right text-sm text-gray-600">
                            Total:{" "}
                            <span className="font-semibold text-base text-(--main-color)">
                                Rp {total.toLocaleString("id-ID")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
