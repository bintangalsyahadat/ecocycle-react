import { useState } from "react";
import { Navbar, Container, Nav, NavItem, NavDropdown, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBell, faUser, } from "@fortawesome/free-solid-svg-icons";

import { doSIgnOut } from "../firebase/auth";

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
                    href="/"
                    className="fw-bold text-white d-flex align-items-center"
                >
                    EcoCycle
                </Navbar.Brand>

                <Nav className="d-flex flex-row align-items-center gap-4">
                    <NavItem className="text-white" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </NavItem>

                    <NavItem className="text-white" style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faBell} />
                    </NavItem>

                    <Dropdown className="m-0">
                        <Dropdown.Toggle className="text-white">
                            <FontAwesomeIcon icon={faUser} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { doSIgnOut().then(() => { window.location.href = "/login"; }) }}>
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}
