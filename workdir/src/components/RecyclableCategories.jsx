import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function RecyclableCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Plastic" },
    { id: 2, name: "Glass" },
    { id: 3, name: "Paper" },
    { id: 4, name: "Metal" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Textiles" },
    { id: 7, name: "Organic" },
  ]);

  const moveLeft = () => {
    setCategories((prev) => {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, prev.length - 1)];
    });
  };

  const moveRight = () => {
    setCategories((prev) => {
      const first = prev[0];
      return [...prev.slice(1), first];
    });
  };

  return (
    <div className="relative w-full ">
      <button
        onClick={moveLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full cursor-pointer shadow p-2 hover:bg-gray-100 z-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-(--main-color) text-xl" />
      </button>

      <div
        className="
          flex justify-center gap-4 overflow-hidden px-12
          sm:px-8 md:px-16 pb-5
        "
      >
        {categories.map((item) => (
          <div
            key={item.id}
            className="
              flex-shrink-0
              w-1/3 sm:w-1/4 md:w-1/5 lg:w-36
              aspect-square
              bg-white rounded-2xl shadow-lg
              flex items-center justify-center
              text-gray-600 font-semibold
              transition-all duration-300
            "
          >
            {item.name}
          </div>
        ))}
      </div>

      <button
        onClick={moveRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow cursor-pointer p-2 hover:bg-gray-100 z-10"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-(--main-color) text-xl" />
      </button>
    </div>
  );
}
