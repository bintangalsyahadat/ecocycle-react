import { useLocation, useNavigate } from 'react-router-dom';
import NavbarPortal from "../components/NavbarPortal";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import MapView from '../components/MapView';
import FooterPortal from '../components/FooterPortal';
import { useEffect, useRef } from 'react';

const AboutSection = () => {
    return (
        <div className="bg-light text-black">
            <Container>
                <div className="mx-auto px-3 py-5 text-center">
                    <div className="py-5">
                        <h2 className="text-primary fw-bold mb-4">Solusi Digital untuk Sampah Bernilai</h2>
                        <p className="d-md-block d-none text-gray-600 mx-auto w-50">
                            Platform ini membantu masyarakat menjual dan membeli sampah daur ulang. Kami percaya bahwa sampah bukan akhir,
                            melainkan awal dari peluang baru untuk ekonomi sirkular yang berkelanjutan.
                        </p>
                        <p className="d-md-none text-gray-600 mx-auto">
                            Platform ini membantu masyarakat menjual dan membeli sampah daur ulang. Kami percaya bahwa sampah bukan akhir,
                            melainkan awal dari peluang baru untuk ekonomi sirkular yang berkelanjutan.
                        </p>
                        <div id="features"></div>
                    </div>
                </div>

            </Container>
        </div>
    );
}

const FeatureSection = () => {
    return (
        <div className='py-5' style={{ backgroundColor: "var(--main-bg-color-light)" }}>
            <Container className='mb-5'>
                <h2 className="text-center fw-bold mb-5 text-primary">
                    Fitur Utama
                </h2>

                <Row className="g-4">
                    {
                        [
                            {
                                img: "https://i.imgur.com/s1b10Au.png",
                                title: "Jual Sampah Daur Ulang",
                                text: "Jual sampah plastik, logam, kertas, dan botol bekas ke mitra pengepul dengan harga transparan dan proses mudah."
                            },
                            {
                                img: "https://i.imgur.com/A7yVh28.png",
                                title: "Beli Bahan Daur Ulang",
                                text: "Pengepul atau industri daur ulang dapat mencari dan membeli bahan sesuai kebutuhan langsung dari sumbernya."
                            },
                            {
                                img: "https://i.imgur.com/1tngvzE.png",
                                title: "Dashboard Transaksi",
                                text: "Pantau semua transaksi, harga, dan riwayat jual-beli secara transparan dan real-time."
                            },
                            {
                                img: "https://i.imgur.com/preKYFn.png",
                                title: "Edukasi & Panduan",
                                text: "Pelajari cara memilah dan mengelola sampah agar bernilai lebih tinggi dan ramah lingkungan."
                            },
                        ].map((item, index) => (
                            <Col key={index} md={6}>
                                <Card className="shadow border-0 rounded-4 h-100 p-4">
                                    <Card.Body className='d-lg-flex align-items-center text-lg-start text-center'>
                                        <div className='me-3 mb-lg-0 mb-3'>
                                            <img
                                                src={item.img}
                                                className="img-fluid"
                                                style={{ maxWidth: "100px", objectFit: "contain" }}
                                            />
                                        </div>
                                        <div>
                                            <Card.Title className="fw-semibold fs-5 mb-2">{item.title}</Card.Title>
                                            <Card.Text className="text-secondary">{item.text}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                    <div id="process"></div>
                </Row>
            </Container>
        </div>
    )
}

const ProcessSection = () => {
    return (
        <div className="py-5 bg-white text-center">
            <Container>
                <h2 className="fw-bold text-primary mb-5">Aksi Kecil Selamatkan Bumi</h2>
                <Row className="gy-4 justify-content-center">
                    {[
                        {
                            img: "https://i.imgur.com/aKvzCSS.png",
                            title: "Pilah Sampah",
                            desc: "Pisahkan sampah organik dan anorganik sesuai jenisnya."
                        },
                        {
                            img: "https://i.imgur.com/RVE4uQs.png",
                            title: "Kumpulkan",
                            desc: "Kumpulkan barang daur ulang seperti plastik, kaleng, dan kertas."
                        },
                        {
                            img: "https://i.imgur.com/iO37xT6.png",
                            title: "Bersihkan & Simpan",
                            desc: "Pastikan semua bahan dalam kondisi bersih dan kering sebelum dijual."
                        },
                        {
                            img: "https://i.imgur.com/x84dW89.png",
                            title: "Jual & Dapatkan Keuntungan",
                            desc: "Serahkan ke pengepul dan dapatkan keuntungan sambil bantu lingkungan."
                        }
                    ].map((item, index) => (
                        <Col key={index} md={3}>
                            <Card
                                className="border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center text-center"
                                style={{ backgroundColor: "#fff" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center mb-3"
                                    style={{ height: "200px" }}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{ maxHeight: "180px", objectFit: "contain" }}
                                    />
                                </div>
                                <h4 className="fw-semibold mb-2">{item.title}</h4>
                                <p className="text-secondary mb-0">{item.desc}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <div id="contact"></div>
        </div>
    )
}

const MapSection = () => {
    return (
        <div className='bg-light py-5 text-center'>
            <Container>
                <div className="mx-auto text-center">
                    <h2 className="fw-bold text-primary mb-4">Peta Lokasi EcoCylce</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-0 fw-bold">
                        Ingin tahu di mana EcoCycle sudah hadir?
                    </p>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                        Temukan lokasi terdekat untuk mulai berkontribusi menjaga lingkungan
                    </p>
                </div>
                <Card>
                    <MapView />
                </Card>
            </Container>
        </div>
    )
}

export default function Home() {
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
        <div className='relative'>
            <NavbarPortal contentSectionRef={contentSectionRef} />
            <div className='position-fixed w-100' style={{ zIndex: "10" }}>
                <div className='ecocycle-container position-relative w-100 f-montserrat'>
                    <Container fluid className="position-fixed p-0">
                        <div
                            className="d-flex flex-column justify-content-center align-items-center text-center text-white"
                            style={{
                                height: "100dvh",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                paddingTop: "56px",
                                boxSizing: "border-box",
                            }}
                        >
                            <div>
                                <div className="display-4 mb-0 fw-bold text-nowrap">SAMPAH JADI NILAI</div>
                                <div className="display-6 mb-4 fw-bold">MULAI DARI HAL KECIL</div>
                                <div className="d-flex justify-content-center mb-3">
                                    <p className="m-0 w-75" style={{ fontSize: "12px" }}>
                                        BANGUN KEBIASAAN RAMAH LINGKUNGAN BELAJAR, BERTINDAK, DAN DAPATKAN
                                        MANFAAT NYATA BERSAMA ECO CYCLE
                                    </p>
                                </div>

                                <Button
                                    className="fw-bold rounded-pill px-5 py-2"
                                    style={{ border: "none" }}
                                    onClick={() => navigate("/login")}
                                >
                                    MULAI
                                </Button>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>
            <div style={{ height: "100vh" }}></div>
            <div ></div>

            <div ref={contentSectionRef} style={{ position: "relative", zIndex: 20, background: "white" }} className='white-section'>
                <div className="torn-top bg-light"></div>

                <div id="about" style={{ marginTop: "90px" }}>
                    <AboutSection />
                    <FeatureSection />
                    <ProcessSection />
                    <MapSection />
                    <FooterPortal />
                </div>
            </div>
        </div>
    );
}
