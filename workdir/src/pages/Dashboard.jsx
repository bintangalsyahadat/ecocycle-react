import { Navigate } from "react-router-dom";
import ActivityCards from "../components/ActivityCard";
import DailyCard from "../components/DailyCard";
import FooterPortal from "../components/footer/FooterPortal";
import MapView from "../components/MapView";
import MenuList from "../components/MenuList";
import Navbar from "../components/navbar/Navbar";
import RecyclableCategories from "../components/RecyclableCategories";
import SearchInput from "../components/SearchInput";
import { useAuth } from "../contexts/authContext";
import { FaClockRotateLeft } from "react-icons/fa6";
import UserGretting from "../components/UserGreeting";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loadingStates, setLoadingStates] = useState({
    daily: true,
    categories: true,
  });
  const { currentUser, userLoggedIn, loading } = useAuth();
  const allLoading = Object.values(loadingStates).some(l => l);

  useEffect(() => {
    if (!allLoading && !loading) return;

    const timer = setTimeout(() => {
      if (allLoading || loading) {
        window.location.reload();
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [allLoading, loading]);

  if (!userLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="relative">
      {(loading || allLoading || !currentUser) && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999999,
          }}
        >
          <Spinner label="Please Wait..." />
        </div>
      )}

      <div className={`bg-[#F8F9FA] ${loading || allLoading || !currentUser ? "hidden" : ""}`}>
        <Navbar />

        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-5">
          <SearchInput placeholder="Search EcoCycle Point Location..." />

          <UserGretting currentUser={currentUser} />

          <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mb-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-500">Total EcoCoin</p>
                <div className="flex text-xl items-center font-bold text-[color:var(--main-color)]">
                  <img
                    src="/images/ecopoint/coin.png"
                    alt="coin"
                    className="w-6 h-6 me-1"
                  />
                  <p>{currentUser.total_coin}</p>
                  <button className="text-gray-400 hover:text-[color:var(--main-color)] text-sm ms-2 cursor-pointer" title="History">
                    <FaClockRotateLeft />
                  </button>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center justify-center bg-(--main-color) hover:bg-(--main-color-hover) cursor-pointer text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors duration-300 self-start">
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-flow-row md:grid-flow-col md:grid-rows-3 gap-4 mb-5">
            <div className="hidden md:block col-span-20">
              <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full flex items-center">
                <p className="font-bold text-[color:var(--main-color)]">Daily Check-In</p>
              </div>
            </div>

            <div className="hidden md:block col-span-20 row-span-4">
              <DailyCard currentUser={currentUser} setLoadingStates={(v) => setLoadingStates(prev => ({ ...prev, daily: v }))} />
            </div>

            <div className="md:row-span-5 col-span-full md:col-auto">
              <div className="w-full rounded-2xl p-3 h-full">
                <MenuList />
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mb-5">
            <p className="font-bold text-[color:var(--main-color)]">Recyclable Categories</p>
          </div>
          <RecyclableCategories setLoadingStates={(v) => setLoadingStates(prev => ({ ...prev, categories: v }))} />

          <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mt-5 mb-5">
            <p className="font-bold text-[color:var(--main-color)]">EcoCycle Location</p>
          </div>
          <div className="bg-white w-full rounded-2xl shadow-lg  relative mt-5 mb-8 overflow-hidden">
            <MapView />
          </div>

          <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mt-5 mb-5">
            <p className="font-bold text-[color:var(--main-color)]">Our Activity</p>
          </div>
          <ActivityCards />

          <div className="h-20" />
        </div>

        <FooterPortal />
      </div>
    </div>
  );
}
