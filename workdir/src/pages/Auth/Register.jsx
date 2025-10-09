import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import NavbarLandingPage from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaLock, FaFacebookF, FaPhone } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { Link } from 'react-router-dom';


export default function Register() {
  return (
    <div className="ecocycle-container f-montserrat min-vh-100">
      <NavbarLandingPage />

      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <Card className="shadow border-0 login-card py-3" style={{width: "350px"}}>
          <Card.Body>
            <h5 className="mb-3 fw-bold text-success">Sign Up</h5>

            <InputGroup className="mb-2 input-rounded">
              <InputGroup.Text className="input-icon">
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                className="input-field"
              />
            </InputGroup>

            <InputGroup className="mb-2 input-rounded">
              <InputGroup.Text className="input-icon">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                className="input-field"
              />
            </InputGroup>

            <InputGroup className="mb-2 input-rounded">
              <InputGroup.Text className="input-icon">
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="confirm-password"
                placeholder="Confirm Password"
                className="input-field"
              />
            </InputGroup>

            <InputGroup className="mb-4 input-rounded">
              <InputGroup.Text className="input-icon">
                <FaPhone />
              </InputGroup.Text>
              <Form.Control
                type="phone"
                placeholder="Phone"
                className="input-field"
              />
            </InputGroup>

            <Button variant="success" className="w-100 rounded-pill fw-bold">
              Sign Up
            </Button>

            <p className="mt-3 mb-2 text-muted small">or sign in with</p>

            <div className="d-flex justify-content-center gap-3 mb-3">
              <Button variant="light" className="social-btn shadow-sm">
                <FaFacebookF className="text-primary" size={20} />
              </Button>
              <Button variant="light" className="social-btn shadow-sm">
                <SiGmail className="text-danger" size={22} />
              </Button>
            </div>

            <p className="small mb-0">
              Don’t have an account?{' '}
              <Link to="/login" className="text-success fw-bold text-decoration-none">
                Sign In
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
