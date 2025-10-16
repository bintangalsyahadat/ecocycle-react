export default function SectionCategoryBox({ category }) {
    return (
        <div
            className="carousel-track-item d-flex flex-column align-items-center justify-content-between"
            style={{
                width: "95px",
                height: "150px",
                cursor: "pointer",
            }}
        >
            <div
                className="d-flex align-items-center justify-content-center mt-2 rounded-4"
                style={{
                    backgroundColor: category.color,
                    width: "90px",
                    height: "90px",
                }}
            >
                <img
                    src={category.img}
                    alt={category.name}
                    style={{ objectFit: "contain" }}
                />
            </div>
            <p className="mt-2 mb-0 text-white text-center small fw-bold text-nowrap">
                {category.name}
            </p>
        </div>
    )
}