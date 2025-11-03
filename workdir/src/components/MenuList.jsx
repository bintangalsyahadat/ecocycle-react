import { Link } from "react-router-dom";

export default function MenuList() {
  const menus = [
    { name: "Sell", icon: "🏷️", url:"/transaction/sell" },
    { name: "Buy", icon: "🛒", url:"#" },
    { name: "EcoDucation", icon: "🎓", url:"#" },
    { name: "EcoMunity", icon: "👥", url:"#" },
    { name: "Eco Planner", icon: "📅", url:"#" },
    { name: "Eco Point", icon: "💰", url:"#" },
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
            <div className="text-teal-600 text-4xl mb-2">{menu.icon}</div>
            <div className="text-sm font-medium text-gray-700">{menu.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
