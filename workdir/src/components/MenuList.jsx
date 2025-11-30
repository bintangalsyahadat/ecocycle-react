import { Link } from "react-router-dom";
import { useState } from "react";

export default function MenuList() {
  const [popup, setPopup] = useState({ show: false, message: "" });

  const BASE_COLOR = "#01A3B0";

  const menus = [
    { name: "Sell", icon: "/images/menu/sell.png", url: "/transaction/sell", status: "active" },
    { name: "Buy", icon: "/images/menu/buy.png", url: "/transaction/buy", status: "active" },
    { name: "EcoDucation", icon: "/images/menu/ecoducation.png", url: "/EcoDucation", status: "active" },
    { name: "EcoMunity", icon: "/images/menu/ecommunity.png", url: "#", status: "upcoming" },
    { name: "EcoPlanner", icon: "/images/menu/ecoplanner.png", url: "/EcoPlanner", status: "active" },
    { name: "EcoPoint", icon: "/images/menu/ecopoint.png", url: "/ecopoint", status: "active" },
    { name: "EcoBank", icon: "/images/menu/bank.png", url: "#", status: "disable" },
  ];

  // Hide disabled menus
  const filteredMenus = menus.filter((m) => m.status !== "disable");

  const handleUpcoming = (menu) => {
    setPopup({
      show: true,
      message: `${menu.name} is an upcoming feature 🚀`
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Popup */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-5 w-72 text-center">
            <p className="font-semibold text-gray-700">{popup.message}</p>

            <button
              onClick={() => setPopup({ show: false, message: "" })}
              className="mt-4 w-full px-4 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: BASE_COLOR, color: "#fff" }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 w-full">
        {filteredMenus.map((menu) => {
          const isUpcoming = menu.status === "upcoming";
          const isActive = menu.status === "active";

          const CardContent = (
            <div
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-2xl
                shadow-md bg-white transition duration-200
                hover:scale-105 hover:shadow-lg cursor-pointer
                ${isUpcoming ? "opacity-90 cursor-pointer" : ""}
              `}
              // ensure this container is relative so overlays (if any) are anchored correctly
              style={{ minHeight: 120 }}
            >
              <div className="w-16 h-16 mb-2 rounded-xl bg-[#01A3B0]/10 flex items-center justify-center overflow-hidden">
                <img
                  src={menu.icon}
                  alt={menu.name}
                  className="w-14 h-14 object-contain opacity-95"
                />
              </div>

              <div className="text-sm font-semibold text-gray-500">
                {menu.name}
              </div>
            </div>
          );

          // Active: wrap whole card with Link
          if (isActive) {
            return (
              <Link
                key={menu.name}
                to={menu.url}
                className="block"
                aria-label={menu.name}
              >
                {CardContent}
              </Link>
            );
          }

          // Upcoming: use button to trigger popup (no Link)
          if (isUpcoming) {
            return (
              <button
                key={menu.name}
                onClick={() => handleUpcoming(menu)}
                className="block text-left"
                aria-label={`${menu.name} upcoming`}
              >
                {CardContent}
              </button>
            );
          }

          // fallback (shouldn't reach here because we filtered disable)
          return null;
        })}
      </div>
    </div>
  );
}
