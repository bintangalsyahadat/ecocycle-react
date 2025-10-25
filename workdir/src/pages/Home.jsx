import { useLocation, useNavigate } from "react-router-dom";
import FooterPortal from "../components/footer/FooterPortal";
import MapView from "../components/MapView";
import NavbarPortal from "../components/navbar/NavbarPortal";
import { useAuth } from "../contexts/authContext";
import { useEffect, useRef } from "react";
import PageLoader from "../components/PageLoader";

const AboutSection = () => {
    return (
        <div className="bg-[#F8F9FA] text-black" id="about">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="mx-auto px-8 py-16 md:py-24 text-center">
                    <h2 className="text-(--main-color) font-bold mb-8 text-2xl md:text-3xl">
                        Solusi Digital untuk Sampah Bernilai
                    </h2>
                    <p className="mx-auto md:w-[50%]">
                        Platform ini membantu masyarakat menjual dan membeli sampah daur ulang. Kami percaya bahwa sampah bukan akhir,
                        melainkan awal dari peluang baru untuk ekonomi sirkular yang berkelanjutan.
                    </p>
                </div>
            </div>
        </div>
    );
}

const FeatureSection = () => {
    let featuresList = [
        {
            img: `images/features/feature-1.png`,
            title: "Jual Sampah Daur Ulang",
            desc: "Jual sampah plastik, logam, kertas, dan botol bekas ke mitra pengepul dengan harga transparan dan proses mudah."
        },
        {
            img: `images/features/feature-2.png`,
            title: "Beli Bahan Daur Ulang",
            desc: "Pengepul atau industri daur ulang dapat mencari dan membeli bahan sesuai kebutuhan langsung dari sumbernya."
        },
        {
            img: `images/features/feature-3.png`,
            title: "Dashboard Transaksi",
            desc: "Pantau semua transaksi, harga, dan riwayat jual-beli secara transparan dan real-time."
        },
        {
            img: `images/features/feature-4.png`,
            title: "Edukasi & Panduan",
            desc: "Pelajari cara memilah dan mengelola sampah agar bernilai lebih tinggi dan ramah lingkungan."
        },
    ]


    return (
        <div className="py-16 md:py-24 bg-(--main-color-light)" id="features">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="mb-5">
                    <h2 className="text-(--main-color) font-bold mb-8 text-center text-2xl md:text-3xl">
                        Fitur Utama
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{
                        featuresList.map((feature, i) => {
                            return <div key={i}>
                                <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                                    <img src={feature.img} alt="" className="w-20 md:w-30 h-30 object-contain" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="text-sm mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }</div>
                </div>
            </div>
        </div>
    )
}

const ProcessSection = () => {
    const processList = [
        {
            img: `images/actions/action-1.png`,
            title: "Pilah Sampah",
            desc: "Pisahkan sampah organik dan anorganik sesuai jenisnya."
        },
        {
            img: `images/actions/action-2.png`,
            title: "Kumpulkan",
            desc: "Kumpulkan barang daur ulang seperti plastik, kaleng, dan kertas."
        },
        {
            img: `images/actions/action-3.png`,
            title: "Bersihkan & Simpan",
            desc: "Pastikan semua bahan dalam kondisi bersih dan kering sebelum dijual."
        },
        {
            img: `images/actions/action-4.png`,
            title: "Jual & Hasilkan",
            desc: "Serahkan ke pengepul dan dapatkan keuntungan sambil bantu lingkungan."
        }
    ]

    return (
        <div className="py-16 md:py-24 bg-white" id="process">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <h2 className="text-(--main-color) font-bold mb-8 text-center text-2xl md:text-3xl">
                    Aksi Kecil Selamatkan Bumi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">{
                    processList.map((process, i) => {
                        return <div key={i} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
                            <img src={process.img} alt="" className="mx-auto w-40 h-40 mb-4 object-contain" />
                            <h3 className="text-lg font-semibold text-gray-900">{process.title}</h3>
                            <p className="text-sm mt-1">{process.desc}</p>
                        </div>
                    })
                }</div>
            </div>
        </div>
    )
}

const MapSection = () => {
    return (
        <div className="bg-[#F8F9FA] py-16 md:py-24 text-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="mx-auto text-center mb-8">
                    <h2 className="text-(--main-color) font-bold mb-8 text-center text-2xl md:text-3xl">
                        Peta Lokasi EcoCylce
                    </h2>
                    <p className="max-w-3xl text-sm mx-auto mb-0 font-bold">
                        Ingin tahu di mana EcoCycle sudah hadir?
                    </p>
                    <p className="max-w-3x text-sm mx-auto mb-4">
                        Temukan lokasi terdekat untuk mulai berkontribusi menjaga lingkungan
                    </p>
                </div>

                <div className="rounded-2xl overflow-hidden">
                    <MapView />
                </div>
            </div>
        </div>
    )
}


export default function Home() {
    const { userLoggedIn } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const contentSectionRef = useRef(null);

    useEffect(() => {
        if (location.state?.scrollTo) {
            const section = document.querySelector(location.state.scrollTo);
            if (section) {
                setTimeout(() => {
                    section.scrollIntoView({ behavior: "smooth" });
                }, 300);
            }
        }
    }, [location.state]);

    return (
        <PageLoader>
            <div className="relative" id="main">
                <NavbarPortal contentSectionRef={contentSectionRef} />

                <div className="fixed w-full bg-black font-montserrat">
                    <div className="bg-[url(images/background.png)] relative w-full h-screen bg-cover bg-center bg-no-repeat text-white">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="text-center">
                                <p className="text-3xl md:text-6xl m-0 font-bold">
                                    SAMPAH JADI NILAI
                                </p>
                                <p className="text-2xl md:text-4xl m-0 mb-3 md:mb-8 font-bold">
                                    MULAI DARI HAL KECIL
                                </p>
                                <div className="flex justify-center">
                                    <p className="text-xs md:text-base m-0 w-90 md:w-150">
                                        BANGUN KEBIASAAN RAMAH LINGKUNGAN BELAJAR, BERTINDAK, DAN DAPATKAN MANFAAT NYATA BERSAMA ECO CYCLE
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <a href="/dashboard" className="bg-(--main-color) px-10 py-3 rounded-full font-bold">MULAI</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-screen"></div>
                <div ref={contentSectionRef} className="relative z-20 bg-white">
                    <div className="torn-top"></div>

                    <div className="mt-[90px]">
                        <AboutSection />
                        <FeatureSection />
                        <ProcessSection />
                        <MapSection />
                        <div id="contact">
                            <FooterPortal />
                        </div>
                    </div>
                </div>
            </div>
        </PageLoader>
    )
}