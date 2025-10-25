import { useState } from "react";

export default function SearchInput({ placeholder = "Search..." }) {
    const [search, setSearch] = useState("");

    return (
        <div
            className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5"
            style={{ top: "5px" }}
        >
            <input
                className="font-bold rounded-full w-full py-4 pl-4 placeholder:text-gray-400 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="bg-(--main-color) p-2 hover:bg-(--main-color-hover) cursor-pointer mx-2 rounded-full">
                <svg
                    className="w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}
