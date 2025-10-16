import { Button, Card, Col, Row } from "react-bootstrap";
import ActivityBox from "./ActivityBox";


export default function ActivityList() {

    const activities = [
        {
            title: "Bersama Membersihkan Lingkungan, Menjaga Harapan",
            img: "images/activities/activities-1.png",
            desc: "Puluhan relawan EcoCycle turun langsung ke lapangan dalam aksi bersih lingkungan di bantaran Sungai Brantas, Kediri. Kegiatan ini berhasil mengumpulkan lebih dari 300 kg sampah plastik hanya dalam satu pagi.",
        },
        {
            title: "Edukasi Daur Ulang untuk Sekolah Dasar",
            img: "images/activities/activities-1.png",
            desc: "Tim EcoCycle memberikan edukasi pentingnya memilah sampah dan mendaur ulang kepada siswa SD di sekitar Surabaya.",
        },
    ];

    return (
        <Row className="justify-content-center">
            {activities.map((item, index) => (
                <Col
                    key={index}
                    xs={12}
                    md={6}
                    className="mb-4 d-flex justify-content-center"
                >
                    <ActivityBox activity={item} />
                </Col>
            ))}
        </Row>
    )
}