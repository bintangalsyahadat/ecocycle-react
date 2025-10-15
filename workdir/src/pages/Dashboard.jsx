import NavbarLandingPage from "../components/Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";


export default function Dashboard() {

  const features = [
    { img: "images/fitur/fitur-4.png", label: "Sell" },
    { img: "images/fitur/fitur-5.png", label: "Buy" },
    { img: "images/fitur/fitur-3.png", label: "EcoDucation" },
    { img: "images/fitur/fitur-2.png", label: "EcoMunnity" },
    { img: "images/fitur/fitur-6.png", label: "EcoPlanner" },
    { img: "images/fitur/fitur-1.png", label: "EcoPoint" },
  ];

  const categories = [
    { name: "Carton", img: "images/categories/categories-1.png", color: "#ff00b7" },
    { name: "Used Diapers", img: "images/categories/categories-2.png", color: "#f48c16" },
    { name: "Aluminium Can", img: "images/categories/categories-3.png", color: "#a03ad1" },
    { name: "Multilayered Box", img: "images/categories/categories-4.png", color: "#39c9d7" },
    { name: "Glass", img: "images/categories/categories-5.png", color: "#47dc7f" },
    { name: "Used Cooking Oil", img: "images/categories/categories-6.png", color: "#64b800" },
    { name: "Plastic", img: "images/categories/categories-7.png", color: "#b2d235" },
    { name: "Wooden Chopstick", img: "images/categories/categories-8.png", color: "#c87929" },
  ];


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

  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="f-montserrat bg-white">
      <NavbarLandingPage />

      {/* SEARCH & FEATURE ICONS */}
      <Container className="text-center mt-4 d-flex justify-content-center">
        <div
          className="input-group mb-3 w-75"
          style={{
            overflow: "hidden",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <input
            type="text"
            className="form-control border-0"
            placeholder="search"
            aria-label="search"
            aria-describedby="button-addon2"
            style={{ boxShadow: "none" }}
          />
          <button
            className="btn border-0"
            type="button"
            id="button-addon2"
            style={{
              backgroundColor: "white",
              boxShadow: "none",
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </Container>

      {/* RECYCLABLE CATEGORIES */}
      <Container className="text-center my-4">
        <Row
          className="justify-content-center g-0" style={{ columnGap: "40px" }}>
          {features.map((item, index) => (
            <Col key={index} xs="auto" className="d-flex flex-column align-items-center p-0" style={{ width: "75px" }} >
              <a
                href="#"
                className="text-decoration-none text-dark d-flex flex-column align-items-center"
                style={{ width: "100%" }}
              >
                <div
                  className="rounded-4 d-flex align-items-center justify-content-center"
                  style={{
                    border: "1px solid #ccc",
                    width: "60px",
                    height: "60px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "white")
                  }
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <p className="mt-1 mb-0" style={{ fontSize: "13px" }}>
                  {item.label}
                </p>
              </a>
            </Col>
          ))}
        </Row>
      </Container>

      <div style={{
        backgroundColor: "#f2f2f2",
        padding: "40px 0",
      }}>
        <Container
          fluid
          className="d-flex flex-column align-items-center justify-content-center py-4"
          style={{
            backgroundColor: "#00a7b5",
            borderRadius: "30px",
            maxWidth: "95%",
          }}
        >
          <h5
            className="text-white fw-bold text-center mb-3"
            style={{
              borderBottom: "2px solid white",
              paddingBottom: "5px",
              width: "60%",
            }}
          >
            Recyclable Categories
          </h5>

          <div
            className="d-flex flex-nowrap overflow-auto w-100 justify-content-start justify-content-md-center flex-md-wrap"
            style={{
              gap: "18px",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center justify-content-between"
                style={{
                  flex: "0 0 auto",
                  width: "95px",
                  height: "130px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: selected === index ? "scale(1)" : "scale(1)",
                  boxShadow:
                    selected === index
                      ? "0px 6px 12px rgba(255,255,255,0.4)"
                      : "none",
                }}
                onClick={() => handleSelect(index)}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: item.color,
                    width: "90px",
                    height: "90px",
                    borderRadius: "25px",
                    transition: "all 0.3s ease",
                    opacity: selected === index ? 0.9 : 1,
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <p
                  className="mt-2 mb-0 text-white text-center"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "1.2",
                  }}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>


      {/* OUR ACTIVITIES */}
     <Container
      className="py-5"
      style={{ backgroundColor: "white" }}
    >
      <h3 className="fw-bold text-info">Our Activities</h3>
      <div className=" d-flex flex-column align-items-center gap-4 mt-3">
        <Row className="justify-content-center">
        {activities.map((item, index) => (
          <Col
            key={index}
            xs={12}
            md={6} 
            className="mb-4 d-flex justify-content-center"
          >
        <Card
          key={index}
          style={{
            width: "100%",
            maxWidth: "700px",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#00a7b5",
            color: "white",
          }}
          className="shadow-sm"
        >
          <Card.Img
            variant="top"
            src={item.img}
            style={{ height: "220px", objectFit: "cover" }}
          />
          <Card.Body className="text-center">
            <Card.Title className="fw-bold mb-2">
              “{item.title}”
            </Card.Title>
            <Card.Text style={{ fontSize: "14px", lineHeight: "1.5" }}>
              {item.desc}
            </Card.Text>
            <Button
              variant="light"
              className="fw-semibold mt-2 px-4 py-1 rounded-pill"
              style={{ color: "#00a7b5", fontSize: "13px" }}
            >
              READ MORE
            </Button>
          </Card.Body>
        </Card>
        </Col>
      ))}
      </Row>
      </div>
    </Container>

      <div className="py-5"></div>
    </div>
  );
}
