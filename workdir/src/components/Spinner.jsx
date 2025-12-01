export default function Spinner({ label = "Loading..." }) {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    border: "6px solid #ccc",
                    borderTop: "6px solid #01A3B0",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            ></div>
            <p className="text-gray-500" style={{ marginTop: "15px", fontSize: "16px", fontWeight: "bold" }}>
                {label}
            </p>
            <style>
                {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
            </style>
        </div>
    )
}