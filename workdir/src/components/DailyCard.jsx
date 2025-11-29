export default function DailyCard() {
    const rewards = [
        { day: 1, amount: 5, label: "Hari ini", active: true },
        { day: 2, amount: 10 },
        { day: 3, amount: 20 },
        { day: 4, amount: 30 },
        { day: 5, amount: 40 },
        { day: 6, amount: 50 },
        { day: 7, amount: 100, max: true },
    ];

    return (
        <div className="bg-white w-full rounded-2xl p-3 shadow-lg h-full">
            <div className="flex gap-2 rounded-lg items-stretch justify-between w-full mx-auto mb-3">
                {rewards.map((r) => (
                    <div
                        key={r.day}
                        className={`flex flex-col cursor-pointer items-center justify-center rounded-md px-2 py-1 border transition-all duration-200 w-full
                  ${r.active
                                ? "border-[color:var(--main-color)] bg-[color:var(--main-color)]/10"
                                : "border-gray-200 bg-gray-50 hover:bg-[color:var(--main-color)]/10"
                            }`}
                    >
                        <div
                            className={`text-xs font-semibold ${r.active
                                ? "text-[color:var(--main-color)]"
                                : "text-gray-700"
                                }`}
                        >
                            +{r.amount}
                        </div>

                        <div className="my-1 w-8 h-8 flex items-center justify-center">
                            <img src="/images/ecopoint/point.png"
                                alt="coin" />
                        </div>

                        <div
                            className={`text-[10px] font-medium ${r.active
                                ? "text-[color:var(--main-color)]"
                                : "text-gray-500"
                                }`}
                        >
                            {r.label || `Hari ${r.day}`}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full text-center bg-[color:var(--main-color)] hover:bg-[color:var(--main-color-hover)] p-2 text-white font-bold rounded-full cursor-pointer">
                Check-In
            </button>
        </div>
    );
}
