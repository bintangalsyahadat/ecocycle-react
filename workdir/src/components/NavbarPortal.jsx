import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from "react";
import { Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

export function NavLinkPortal({ navLinkStyle = {}, navLinkUrl = {} }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (sectionId) => {
        if (location.pathname === "/") {
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/", { state: { scrollTo: sectionId } });
        }
    };

    return (
        <Nav className="mx-auto text-center fw-bold" style={{ fontSize: "14px" }}>
            <Nav.Link href="/" className="me-md-3 mb-md-0 mb-2" style={navLinkStyle}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("#about")} className="me-md-3 mb-md-0 mb-2" style={navLinkStyle}>About</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("#features")} className="me-md-3 mb-md-0 mb-2" style={navLinkStyle}>Features</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("#process")} className="me-md-3 mb-md-0 mb-2" style={navLinkStyle}>Process</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("#contact")} className="mb-md-0 mb-2" style={navLinkStyle}>Contact</Nav.Link>
        </Nav>
    )
}

export function NavSocialPortal() {
    return (
        <div className="d-flex justify-content-center justify-content-lg-end gap-3 mt-3 mt-lg-0">
            {
                [
                    {
                        'url': 'https://facebook.com',
                        'icon': faFacebook
                    },
                    {
                        'url': 'https://instagram.com',
                        'icon': faInstagram
                    },
                    {
                        'url': 'https://tiktok.com',
                        'icon': faTiktok
                    }
                ].map((social, index) => (
                    <Link className="text-white text-decoration-none" key={index} to={social.url} target='_blank'>
                        <FontAwesomeIcon icon={social.icon} />
                    </Link>
                ))
            }
        </div>
    )
}


export default function NavbarPortal({ contentSectionRef }) {
    const [onContentSection, setOnContentSection] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const section = contentSectionRef?.current;
        if (!section) return;

        const isMobile = window.innerWidth <= 992;
        const thresholdValue = isMobile ? 0.1 : 0.3;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setOnContentSection(entry.isIntersecting);
            },
            { threshold: thresholdValue }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [contentSectionRef]);


    const showBackground = onContentSection || expanded;
    const navbarBgColor = showBackground
        ? "rgba(1, 163, 176, 1)"
        : "rgba(0, 0, 0, 0)";

    return (
        <Navbar
            expand="lg"
            variant="dark"
            fixed="top"
            className="navbar-eco py-3"
            onToggle={(val) => setExpanded(val)}
            style={{
                transition: "all 0.4s ease",
                backgroundColor: navbarBgColor
            }}
        >

            <Container>
                <Navbar.Brand href="/" className="fw-bold text-white">
                    EcoCycle
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <NavLinkPortal />
                    <NavSocialPortal />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}