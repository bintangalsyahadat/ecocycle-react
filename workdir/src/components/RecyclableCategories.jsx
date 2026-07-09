import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from "../utils/api";

function CategoryImage({ item }) {
  const [imgError, setImgError] = useState(false);

  if (!item.image || imgError) {
    return (
      <div className="w-full aspect-square flex items-center justify-center text-gray-400 text-sm bg-gray-100 rounded-xl">
        No Image
      </div>
    );
  }

  return (
    <img
      src={`data:image/jpeg;base64,${item.image}`}
      className="w-full aspect-square object-cover rounded-xl"
      onError={() => setImgError(true)}
      alt={item.name}
    />
  );
}

export default function RecyclableCategories({ setLoadingStates }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const categoriesResult = await fetchCategories();
      setCategories(categoriesResult);
    } catch (e) {
      console.error("fetchCategories error:", e);
    } finally {
      setLoadingStates(false);
    }
  };

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
        {categories?.map((item) => (
          <div
            key={item.id}
            className={`
              flex-shrink-0
              w-1/3 sm:w-1/4 md:w-1/5 lg:w-36
              aspect-square
              bg-white rounded-2xl shadow-lg
              text-center p-3
              text-gray-600 font-semibold
              transition-all duration-300
            `}
          >
            <div className="flex justify-center w-full">
              <CategoryImage item={item} />
            </div>
            <p className="text-sm">{item.name}</p>
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
