import { Col, Row } from "react-bootstrap";
import MenuBox from "./MenuBox";



export default function MenuList({ className = "" }) {

    const features = [
        { id: 1, img: "images/fitur/fitur-4.png", label: "Sell" },
        { id: 2, img: "images/fitur/fitur-5.png", label: "Buy" },
        { id: 3, img: "images/fitur/fitur-6.png", label: "EcoPlanner" },
        { id: 4, img: "images/fitur/fitur-3.png", label: "EcoDucation" },
        { id: 5, img: "images/fitur/fitur-2.png", label: "EcoMunnity" },
        { id: 6, img: "images/fitur/fitur-1.png", label: "EcoPoint" },
    ];

    return (
        <Row
            className={className}>
            {features.map((item, index) => (
                <Col key={index} md={2} xs={4}>
                    <MenuBox menu={item} />
                </Col>
            ))}
        </Row>
    )
}