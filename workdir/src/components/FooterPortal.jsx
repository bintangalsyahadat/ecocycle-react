import Container from 'react-bootstrap/Container';
import { NavLinkPortal } from './NavbarPortal';
import { Col, Row } from 'react-bootstrap';



export default function FooterPortal() {
    return (
        <div
            className='bg-primary'
            style={{
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
                        <div className='mb-4'>
                            <NavLinkPortal navLinkStyle={{ color: "#fff" }} />
                        </div>
                        <Row>
                            <Col md={6} className='text-start mb-3'>
                                <p className='m-0 fw-bold small'>Phone:</p>
                                <a
                                    href="tel:+623216821990"
                                    className="text-white text-decoration-none"
                                >
                                    +62 (321) 682 1990
                                </a>
                            </Col>
                            <Col md={6} className='text-start mb-3'>
                                <p className='m-0 fw-bold small'>Email:</p>
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
                <hr style={{ borderColor: "#fff", borderWidth: "2px" }} />
                <div className="text-center">
                    <small>Copyright © {new Date().getFullYear()} EcoCycle</small>
                </div>
            </Container>
        </div>
    );
}