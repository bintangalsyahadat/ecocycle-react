import SectionCategoryBox from "./SectionCategoryBox";

export default function SectionCategoryList() {
    const categories = [
        { name: "Carton", img: "images/categories/categories-1.png", color: "#ff00b7" },
        { name: "Used Diapers", img: "images/categories/categories-2.png", color: "#f48c16" },
        { name: "Aluminium Can", img: "images/categories/categories-3.png", color: "#a03ad1" },
        { name: "Multilayered Box", img: "images/categories/categories-4.png", color: "#39c9d7" },
        { name: "Glass", img: "images/categories/categories-5.png", color: "#47dc7f" },
        { name: "Used Cooking Oil", img: "images/categories/categories-6.png", color: "#64b800" },
        { name: "Plastic", img: "images/categories/categories-7.png", color: "#b2d235" },
        { name: "Wooden Chopstick", img: "images/categories/categories-8.png", color: "#c87929" },
    ];


    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-4 px-md-5 px-3 bg-primary rounded-4" >
            <h5 className="text-white fw-bold text-center m-0">Recyclable Categories</h5>
            <div className="border-bottom border-2 border-white w-75 mt-3 mb-4"></div>

            <div className="category-carousel w-100 overflow-hidden px-3">
                <div className="carousel-track d-flex flex-nowrap gap-md-5 gap-4">
                    {[...categories, ...categories].map((item, index) => (
                        <SectionCategoryBox category={item} key={index} />
                    ))}
                </div>
            </div>
        </div>

    )
}