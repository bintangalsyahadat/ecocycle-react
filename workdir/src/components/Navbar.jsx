import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";

export default function NavbarLandingPage() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };
        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const navbarBgColor = isMobile
        ? "rgba(0, 0, 0, 0.4)" 
        : scrolled
            ? "rgba(0, 0, 0, 0.4)" 
            : "rgba(0, 0, 0, 0)";   

    return (
        <Navbar
            expand="lg"
            variant="dark"
            fixed="top"
            className="navbar-eco py-3"
            style={{
                transition: "all 0.4s ease",
                backgroundColor: navbarBgColor,
            }}
        >

            <Container>
                <Navbar.Brand href="/" className="fw-bold text-white">
                    EcoCycle
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto text-center">
                        <Nav.Link href="/" className="nav-link-eco mb-3" active>Home</Nav.Link>
                        <Nav.Link href="#about" className="nav-link-eco mb-3" >About</Nav.Link>
                        <Nav.Link href="#features" className="nav-link-eco mb-3">Features</Nav.Link>
                        <Nav.Link href="#process" className="nav-link-eco mb-3">Process</Nav.Link>
                        <Nav.Link href="#contact" className="nav-link-eco mb-3">Contact</Nav.Link>
                    </Nav>

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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
