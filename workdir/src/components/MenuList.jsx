import { Link } from "react-router-dom";
import { useState } from "react";

export default function MenuList() {
  const BASE_COLOR = "#01A3B0";

  const menus = [
    { name: "Sell", icon: "/images/menu/sell.png", url: "/transaction/sell", status: "active" },
    { name: "Buy", icon: "/images/menu/buy.png", url: "/transaction/buy", status: "active" },
    { name: "EcoDucation", icon: "/images/menu/ecoducation.png", url: "/EcoDucation", status: "active" },
    { name: "EcoMunity", icon: "/images/menu/ecommunity.png", url: "/EcoMunity", status: "active" },
    { name: "EcoPlanner", icon: "/images/menu/ecoplanner.png", url: "/EcoPlanner", status: "active" },
    { name: "EcoPoint", icon: "/images/menu/ecopoint.png", url: "/ecopoint", status: "active" },
    { name: "EcoBank", icon: "/images/menu/bank.png", url: "#", status: "disable" },
  ];

  const filteredMenus = menus.filter((m) => m.status === "active");

  return (
    <div className="flex flex-col items-center justify-center w-full">

      <div className="grid grid-cols-3 gap-4 w-full">
        {filteredMenus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.url}
            className="block"
          >
            <div
              className="
                relative flex flex-col items-center justify-center p-4 rounded-2xl
                shadow-md bg-white transition duration-200
                hover:scale-105 hover:shadow-lg cursor-pointer
              "
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
          </Link>
        ))}
      </div>
    </div>
  );
}
