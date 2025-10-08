import { useNavigate } from 'react-router-dom';
import NavbarLandingPage from "../components/Navbar";
import { Button, Container, Row, Col, Card } from "react-bootstrap";



export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className='ecocycle-container f-montserrat'>
                <NavbarLandingPage />
                <Container>
                    <div className='position-relative' style={{ height: "100vh" }}>
                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                            <div className="display-4 mb-0 fw-bold text-nowrap">SAMPAH JADI NILAI</div>
                            <div className="display-6 mb-4 fw-bold">MULAI DARI HAL KECIL</div>
                            <div className=" d-flex justify-content-center mb-3">
                                <p className="m-0 w-75" style={{ fontSize: "12px" }}>
                                    BANGUN KEBIASAAN RAMAH LINGKUNGAN BELAJAR,BERTINDAK,DAN DAPATKAN MANFAAT NYATA BERSAMA ECO CYCLE
                                </p>
                            </div>

                            <Button
                                className="fw-bold rounded-pill px-5 py-2 text-black"
                                style={{ backgroundColor: "#8dee2c", border: "none" }}
                                onClick={() => navigate('/login')}
                            >
                                MULAI
                            </Button>
                        </div>
                    </div>

                </Container>
            </div>
            <div id="about" className="bg-light text-black">
                <Container>
                    <div className="mx-auto px-3 py-5 text-center">
                        <h3 className="text-3xl font-bold text-green-700 mb-4">🌱 Solusi Digital untuk Sampah Bernilai</h3>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Platform ini membantu masyarakat menjual dan membeli sampah daur ulang. Kami percaya bahwa sampah bukan akhir, melainkan awal dari peluang baru untuk ekonomi sirkular yang berkelanjutan.
                        </p>
                    </div>
                </Container>
            </div>
            <div id="features" style={{ backgroundColor: "#f0fdf4", padding: "5rem 0" }}>
                <Container>
                    <h3 className="text-center fw-bold mb-5" style={{ color: "#15803d", fontSize: "2rem" }}>
                        💡 Fitur Utama RosokIn
                    </h3>

                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="shadow border-0 rounded-4 h-100">
                                <Card.Body>
                                    <Card.Title className="fw-semibold fs-5 mb-2">🛒 Jual Sampah Daur Ulang</Card.Title>
                                    <Card.Text className="text-secondary">
                                        Jual sampah plastik, logam, kertas, dan botol bekas ke mitra pengepul dengan harga
                                        transparan dan proses mudah.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="shadow border-0 rounded-4 h-100">
                                <Card.Body>
                                    <Card.Title className="fw-semibold fs-5 mb-2">💰 Beli Bahan Daur Ulang</Card.Title>
                                    <Card.Text className="text-secondary">
                                        Pengepul atau industri daur ulang dapat mencari dan membeli bahan sesuai kebutuhan
                                        langsung dari sumbernya.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="shadow border-0 rounded-4 h-100">
                                <Card.Body>
                                    <Card.Title className="fw-semibold fs-5 mb-2">📊 Dashboard Transaksi</Card.Title>
                                    <Card.Text className="text-secondary">
                                        Pantau semua transaksi, harga, dan riwayat jual-beli secara transparan dan real-time.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="shadow border-0 rounded-4 h-100">
                                <Card.Body>
                                    <Card.Title className="fw-semibold fs-5 mb-2">🌿 Edukasi & Panduan</Card.Title>
                                    <Card.Text className="text-secondary">
                                        Pelajari cara memilah dan mengelola sampah agar bernilai lebih tinggi dan ramah lingkungan.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="process" className="py-5 bg-white text-center">
                <Container>
                    <h3 className="fw-bold text-success mb-5 fs-2">🔄 Cara Kerja</h3>

                    <Row className="gy-4">
                        <Col md={3}>
                            <Card className="border-0 shadow-sm p-4 h-100">
                                <div className="fs-2 mb-2">1️⃣</div>
                                <h4 className="fw-semibold mb-2">Daftar Akun</h4>
                                <p className="text-secondary">
                                    Buat akun sebagai penjual atau pembeli sampah daur ulang.
                                </p>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="border-0 shadow-sm p-4 h-100">
                                <div className="fs-2 mb-2">2️⃣</div>
                                <h4 className="fw-semibold mb-2">Upload / Cari Sampah</h4>
                                <p className="text-secondary">
                                    Penjual unggah data sampah, pembeli mencari bahan yang dibutuhkan.
                                </p>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="border-0 shadow-sm p-4 h-100">
                                <div className="fs-2 mb-2">3️⃣</div>
                                <h4 className="fw-semibold mb-2">Transaksi & Penjemputan</h4>
                                <p className="text-secondary">
                                    Setelah kesepakatan, pengepul menjemput atau mengirim bahan.
                                </p>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card className="border-0 shadow-sm p-4 h-100">
                                <div className="fs-2 mb-2">4️⃣</div>
                                <h4 className="fw-semibold mb-2">Dapatkan Keuntungan</h4>
                                <p className="text-secondary">
                                    Hasil transaksi masuk ke akunmu, sambil bantu bumi jadi lebih bersih.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div
                style={{
                    backgroundColor: "#278575",
                    color: "#fff",
                    paddingTop: "3rem",
                    paddingBottom: "1rem",
                }}
            >
                <Container className='px-md-5'>
                    <Row className="align-items-center">
                        <Col md={4} className="mb-5 mb-md-0">
                            <div className="d-flex flex-column align-items-center">
                                <h3 className="fw-bold m-0">EcoCycle</h3>
                            </div>
                        </Col>
                        <Col md={6} className="">
                            <ul className="list-inline mb-4">
                                <li className="list-inline-item fw-bold pe-4">
                                    <a href="#main" className="text-white text-decoration-none">
                                        Main
                                    </a>
                                </li>
                                <li className="list-inline-item fw-bold pe-4">
                                    <a href="#about" className="text-white text-decoration-none">
                                        About
                                    </a>
                                </li>
                                <li className="list-inline-item fw-bold pe-4">
                                    <a href="#features" className="text-white text-decoration-none">
                                        Features
                                    </a>
                                </li>
                                <li className="list-inline-item fw-bold pe-4">
                                    <a
                                        href="#process"
                                        className="text-white text-decoration-none"
                                    >
                                        Process
                                    </a>
                                </li>
                                <li className="list-inline-item fw-bold pe-4">
                                    <a href="#contact" className="text-white text-decoration-none">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                            <Row>
                                <Col md={6} className='text-start mb-3'>
                                    <p className='m-0 small'>Phone:</p>
                                    <a
                                        href="tel:+623216821990"
                                        className="text-white text-decoration-none"
                                    >
                                        +62 (321) 682 1990
                                    </a>
                                </Col>
                                <Col md={6} className='text-start mb-3'>
                                    <p className='m-0 small'>Email:</p>
                                    <a
                                        href="mailto:info@ecocycle.co.id"
                                        className="text-white text-decoration-none"
                                    >
                                        info@ecocycle.co.id
                                    </a>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                    <hr style={{ borderColor: "#fff",borderWidth: "2px" }} />
                    <div className="text-center">
                        <small>Copyright © {new Date().getFullYear()} EcoCycle</small>
                    </div>
                </Container>
            </div>
        </>
    );
}
