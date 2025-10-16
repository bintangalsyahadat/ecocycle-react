import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping,faBell,faUser,} from "@fortawesome/free-solid-svg-icons";

export default function NavbarPortal() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar
            expand="lg"
            variant="dark"
            expanded={expanded}
            onToggle={(val) => setExpanded(val)}
            className="shadow-sm py-3 sticky-top"
            style={{
                backgroundColor: "rgba(1, 163, 176, 1)",
                transition: "all 0.3s ease",
            }}
        >
            <Container>
                <Navbar.Brand
                    href="/dashboard"
                    className="fw-bold text-white d-flex align-items-center"
                >
                    EcoCycle
                </Navbar.Brand>

                <Nav className="d-flex flex-row align-items-center gap-4 mt-3 mt-lg-0">
                    <div className="d-flex flex-column align-items-center text-white">
                        <FontAwesomeIcon icon={faCartShopping} size="lg" />
                    </div>

                    <div className="d-flex flex-column align-items-center text-white">
                        <FontAwesomeIcon icon={faBell} size="lg" />
                        
                    </div>
                    <div className="d-flex flex-column align-items-center text-white">
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
}
