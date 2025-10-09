import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavbarLandingPage() {
    return (
        <Navbar
            expand="lg"
            variant="dark"
            fixed='top'
            className="navbar-eco static-top py-3" 
            style={{zIndex: 9999}}
        >
            <Container>
                <Navbar.Brand href="/" className="fw-bold text-white">
                    EcoCycle
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="mx-auto text-center">
                        <Nav.Link href="/" className="nav-link-eco" active>Home</Nav.Link>
                        <Nav.Link href="#about" className="nav-link-eco" >About</Nav.Link>
                        <Nav.Link href="#features" className="nav-link-eco">Features</Nav.Link>
                        <Nav.Link href="#process" className="nav-link-eco">Process</Nav.Link>
                        <Nav.Link href="#contact" className="nav-link-eco">Contact</Nav.Link>
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
