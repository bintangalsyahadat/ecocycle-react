import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const activities = [
    {
        title: "Bersama Membersihkan Lingkungan, Menjaga Harapan",
        description:
            "Puluhan relawan EcoCycle turun langsung ke lapangan dalam aksi bersih lingkungan di bantaran Sungai Brantas, Kediri. Kegiatan ini berhasil mengumpulkan lebih dari 300 kg sampah plastik hanya dalam satu pagi.",
        image: "images/activities/activity1.webp",
    },
    {
        title: "Edukasi Daur Ulang untuk Sekolah Dasar",
        description:
            "Tim EcoCycle memberikan edukasi pentingnya memilah sampah dan mendaur ulang kepada siswa SD di sekitar Surabaya.",
        image: "images/activities/activity2.webp",
    },
];

export default function ActivityCards() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activities.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                        <div className="h-48 bg-gray-200">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                    “{item.title}”
                                </h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>

                            <button className="mt-4 inline-flex items-center justify-center bg-(--main-color) hover:bg-(--main-color-hover) cursor-pointer text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors duration-300 self-start">
                                Read More
                                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
