export default function UserGretting({ currentUser }) {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 11) return "Good Morning";
        if (hour >= 11 && hour < 15) return "Good Afternoon";
        if (hour >= 15 && hour < 24) return "Good Evening";
        return "Hello";
    };

    return (
        <div className="bg-white w-full rounded-2xl shadow-lg p-3 h-full relative mb-3">
            <p className="font-bold text-[color:var(--main-color)]">
                {getGreeting()}, {currentUser?.name} 👋
            </p>
        </div>
    );
}