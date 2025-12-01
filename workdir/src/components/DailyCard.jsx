import { useEffect, useState } from "react";
import { fetchDailyPointReward, userDailyCheck } from "../utils/api";

export default function DailyCard({ currentUser, setLoadingStates }) {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ show: false, success: false, message: "" });
    const [checkedToday, setCheckedToday] = useState(currentUser?.is_already_daily_checkin);

    useEffect(() => {
        const getRewards = async () => {
            const r = await fetchDailyPointReward();
            setRewards(r);

            if (r.length > 0) {
                setLoadingStates(false);
            }
        };

        getRewards();
    }, []);

    const actionCheckIn = async () => {
        if (checkedToday) {
            setModal({
                show: true,
                success: false,
                message: "Kamu sudah check-in hari ini!"
            });
            return;
        }

        setLoading(true);

        try {
            const check = await userDailyCheck(currentUser.id);

            if (!check) {
                setModal({
                    show: true,
                    success: true,
                    message: "Check-in berhasil! Kamu mendapatkan poin hari ini 🎉",
                });

                setCheckedToday(true);
                currentUser.is_already_daily_checkin = true;
            } else {
                setModal({
                    show: true,
                    success: false,
                    message: "Check-in gagal. Silakan coba lagi.",
                });
            }
        } catch (err) {
            console.error("Check-in Error:", err);

            setModal({
                show: true,
                success: false,
                message: err?.message || "Terjadi kesalahan tak terduga.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white w-full rounded-2xl p-3 shadow-lg h-full relative">

            {modal.show && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                        <h2 className={`font-bold text-lg ${modal.success ? "text-green-600" : "text-red-500"}`}>
                            {modal.success ? "Berhasil" : "Gagal"}
                        </h2>
                        <p className="mt-2 text-gray-600">{modal.message}</p>

                        <button
                            onClick={() => setModal({ show: false })}
                            className="mt-4 text-white px-4 py-2 rounded-lg w-full bg-[color:var(--main-color)]"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div className="flex gap-2 rounded-lg items-stretch justify-between w-full mx-auto mb-3">
                {rewards.map((r) => {
                    const todaySequence = currentUser?.last_daily_check_on + 1;

                    const isToday = r.sequence === todaySequence; // hari sekarang
                    const isPassed = r.sequence <= currentUser?.last_daily_check_on; // hari yang sudah lewat

                    return (
                        <div
                            key={r.sequence}
                            className={`flex flex-col items-center justify-center rounded-md px-2 py-1 border transition-all duration-200 w-full
                                ${isToday && !checkedToday
                                    ? "border-[color:var(--main-color)] bg-[color:var(--main-color)]/10"
                                    : r.is_random ? "border-[color:var(--main-color)] bg-[color:var(--main-color)]/30" : isPassed
                                        ? "border-gray-300 bg-gray-200 opacity-50"
                                        : "border-gray-200 bg-gray-50"
                                }`}
                        >
                            <div
                                className={`md:text-sm font-semibold
                                    ${isToday && !checkedToday ? "text-[color:var(--main-color)]" : "text-gray-700"}
                                    ${!r.is_random ? "mt-1 mb-2 md:mb-0 md:mt-0 text-[10px]" : "text-[9px]"}`}
                            >
                                {r.name}
                            </div>

                            <div className="my-1 md:w-8 w-6 h-8 flex items-center justify-center">
                                <img src="/images/ecopoint/point.png" alt="coin" />
                            </div>

                            <div
                                className={`md:text-xs text-[9px] font-medium 
                                    ${isToday && !checkedToday  ? "text-[color:var(--main-color)]" : "text-gray-500"}`}
                            >
                                Day {r.sequence}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={actionCheckIn}
                disabled={loading || checkedToday}
                className={`
                    w-full text-center text-white font-bold rounded-full p-2 transition-all bg-[color:var(--main-color)]
                    ${loading || checkedToday ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
                `}
            >
                {loading
                    ? "Checking..."
                    : checkedToday
                        ? "You have already checked in today."
                        : "Check-In"
                }
            </button>

        </div>
    );
}
