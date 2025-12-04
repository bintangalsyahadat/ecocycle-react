import Spinner from "../components/Spinner";

export default function LoadingScreen(loading, label = "Please Wait...") {
    return (
        <>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(255, 255, 255, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999999,
                    }}
                >
                    <Spinner label={label} />
                </div>
            )}
        </>
    )
}