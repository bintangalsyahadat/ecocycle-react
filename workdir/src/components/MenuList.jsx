import { Link } from "react-router-dom";

export default function MenuList() {
  const menus = [
    { name: "Sell", icon: "/images/menu/sell.png", url:"/transaction/sell" },
    { name: "Buy", icon: "/images/menu/buy.png", url:"/transaction/buy" },
    { name: "EcoDucation", icon: "/images/menu/ecoducation.png", url:"/EcoDucation" },
    { name: "EcoMunity", icon: "/images/menu/ecommunity.png", url:"#" },
    { name: "Eco Planner", icon: "/images/menu/ecoplanner.png", url:"/EcoPlanner" },
    { name: "Eco Point", icon: "/images/menu/ecopoint.png", url:"/EcoPoint" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu, index) => (
          <Link
            key={index}
            to={menu.url}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border hover:bg-teal-50 transition duration-200 cursor-pointer"
          >
            <img
              src={menu.icon}
              alt={menu.name}
              className="w-21 h-15 mb-2 object-contain"
            />

            <div className="text-sm font-medium text-gray-700">{menu.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
