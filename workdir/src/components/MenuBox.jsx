export default function MenuBox({ menu }) {
    return (
        <div className="d-flex flex-column align-items-center mb-3">
            <a
                href="#"
                className="text-decoration-none text-dark d-flex flex-column align-items-center"
                onMouseEnter={(e) => {
                    const div = e.currentTarget.querySelector(`#menu-${menu.id}`);
                    if (div) div.style.backgroundColor = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                    const div = e.currentTarget.querySelector(`#menu-${menu.id}`);
                    if (div) div.style.backgroundColor = "white";
                }}
            >
                <div
                    id={'menu-' + menu.id}
                    className="rounded-4 d-flex align-items-center justify-content-center border"
                    style={{
                        width: "60px",
                        height: "60px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                    }}
                >
                    <div>
                        <img
                            src={menu.img}
                            alt={menu.label}
                            style={{
                                width: "28px",
                                height: "28px",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>
                <p className="mt-2 mb-0 small fw-semibold text-secondary">
                    {menu.label}
                </p>
            </a>
        </div>
    )
}