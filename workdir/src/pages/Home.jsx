import { useLocation, useNavigate } from "react-router-dom";
import FooterPortal from "../components/footer/FooterPortal";
import MapView from "../components/MapView";
import NavbarPortal from "../components/navbar/NavbarPortal";
import { useAuth } from "../contexts/authContext";
import { useEffect, useRef } from "react";
import PageLoader from "../components/PageLoader";

import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
};


// ================= ABOUT ===================
const AboutSection = () => {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#F8F9FA] text-black"
            id="about"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="mx-auto px-8 py-16 md:py-24 text-center">
                    <motion.h2
                        variants={fadeUp}
                        className="text-(--main-color) font-bold mb-8 text-2xl md:text-3xl"
                    >
                        Solusi Digital untuk Sampah Bernilai
                    </motion.h2>

                    <motion.p variants={fadeUp} className="mx-auto md:w-[50%]">
                        Platform ini membantu masyarakat menjual dan membeli sampah daur ulang.
                        Kami percaya bahwa sampah bukan akhir, melainkan awal dari peluang baru
                        untuk ekonomi sirkular yang berkelanjutan.
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

// ================= FEATURES ===================
const FeatureSection = () => {
    const featuresList = [
        {
            img: `images/features/feature-1.png`,
            title: "Jual Sampah Daur Ulang",
            desc: "Jual sampah plastik, logam, kertas, dan botol bekas dengan proses mudah.",
        },
        {
            img: `images/features/feature-2.png`,
            title: "Beli Bahan Daur Ulang",
            desc: "Industri daur ulang dapat membeli bahan langsung dari sumbernya.",
        },
        {
            img: `images/features/feature-3.png`,
            title: "Dashboard Transaksi",
            desc: "Pantau transaksi, harga, dan riwayat secara real-time.",
        },
        {
            img: `images/features/feature-4.png`,
            title: "Edukasi & Panduan",
            desc: "Pelajari cara memilah sampah agar bernilai lebih tinggi.",
        },
    ];

    return (
        <div className="py-16 md:py-24 bg-(--main-color-light)" id="features">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-(--main-color) font-bold mb-8 text-center text-2xl md:text-3xl"
                >
                    Fitur Utama
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuresList.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={i % 2 === 0 ? fadeLeft : fadeRight}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                                <img src={feature.img} className="w-20 h-20 object-contain" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm mt-1">{feature.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================= PROCESS ===================
const ProcessSection = () => {
    const processList = [
        {
            img: `images/actions/action-1.png`,
            title: "Pilah Sampah",
            desc: "Pisahkan sampah organik & anorganik.",
        },
        {
            img: `images/actions/action-2.png`,
            title: "Kumpulkan",
            desc: "Kumpulkan plastik, kertas, logam, dan botol.",
        },
        {
            img: `images/actions/action-3.png`,
            title: "Bersihkan & Simpan",
            desc: "Pastikan bahan bersih sebelum dijual.",
        },
        {
            img: `images/actions/action-4.png`,
            title: "Jual & Hasilkan",
            desc: "Serahkan ke pengepul dan dapatkan keuntungan.",
        },
    ];

    return (
        <div className="py-16 md:py-24 bg-white" id="process">
            <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-(--main-color) font-bold mb-8 text-center text-2xl md:text-3xl"
            >
                Aksi Kecil Selamatkan Bumi
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">
                {processList.map((p, i) => (
                    <motion.div
                        key={i}
                        variants={zoomIn}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                        <img src={p.img} className="mx-auto w-40 h-40 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                        <p className="text-sm mt-1">{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// ================= MAP ===================
const MapSection = () => {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#F8F9FA] py-16 md:py-24 text-black"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-(--main-color) font-bold mb-8 text-2xl md:text-3xl">
                        Peta Lokasi EcoCycle
                    </h2>
                    <p className="font-bold">Ingin tahu di mana EcoCycle sudah hadir?</p>
                    <p className="mb-4">Temukan lokasi terdekat dan mulai berkontribusi</p>
                </div>

                <motion.div variants={zoomIn} className="rounded-2xl overflow-hidden">
                    <MapView />
                </motion.div>
            </div>
        </motion.div>
    );
};

// ================= HOME ===================
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

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="fixed w-full bg-black font-montserrat"
                >
                    <div className="bg-[url(/images/background.png)] relative w-full h-screen bg-cover bg-center bg-no-repeat text-white">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="text-center"
                            >
                                <p className="text-3xl md:text-6xl font-bold">
                                    SAMPAH JADI NILAI
                                </p>
                                <p className="text-2xl md:text-4xl mb-8 font-bold">
                                    MULAI DARI HAL KECIL
                                </p>
                                <p className="text-xs md:text-base w-80 md:w-150 mx-auto">
                                    BANGUN KEBIASAAN RAMAH LINGKUNGAN BELAJAR, BERTINDAK, DAN DAPATKAN MANFAAT NYATA BERSAMA ECO CYCLE
                                </p>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="mt-8"
                                >
                                    <a
                                        href="/dashboard"
                                        className="bg-(--main-color) px-10 py-3 rounded-full font-bold"
                                    >
                                        MULAI
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* CONTENT */}
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
    );
}
