export default function MenuList() {
  const menus = [
    { name: "Sell", icon: "🏷️" },
    { name: "Buy", icon: "🛒" },
    { name: "EcoDucation", icon: "🎓" },
    { name: "EcoMunity", icon: "👥" },
    { name: "Eco Planner", icon: "📅" },
    { name: "Eco Point", icon: "💰" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-3 gap-4">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border hover:bg-teal-50 transition duration-200 cursor-pointer"
          >
            <div className="text-teal-600 text-4xl mb-2">{menu.icon}</div>
            <div className="text-sm font-medium text-gray-700">{menu.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
