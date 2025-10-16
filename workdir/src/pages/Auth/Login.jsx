import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import NavbarPortal from '../../components/NavbarPortal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEnvelope, FaLock, FaFacebookF } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { Link, Navigate } from 'react-router-dom';

import { doSignINWithEmailAndPassword, doSignINWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { useState } from 'react';


export default function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignINWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignINWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };


  return (
    <>
      {userLoggedIn ? <Navigate to="/dashboard" replace={true} /> : <div className="ecocycle-container f-montserrat min-vh-100 bg-black">
        <NavbarPortal />

        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <Card className="shadow border-0 login-card" style={{ width: "350px" }}>
            <Card.Body>
              <h5 className="mb-3 fw-bold text-primary">Sign In</h5>

              <InputGroup className="mb-3 input-rounded">
                <InputGroup.Text className="input-icon">
                  <FaEnvelope />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  onKeyUp={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup className="mb-4 input-rounded">
                <InputGroup.Text className="input-icon">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  onKeyUp={(e) => setPassword(e.target.value)}
                />
              </InputGroup>

              <Button variant="primary" className="w-100 rounded-pill fw-bold" onClick={onSubmit}>
                Sign In
              </Button>

              <p className="mt-3 mb-2 text-muted small">or sign in with</p>

              <div className="d-flex justify-content-center gap-3 mb-3">
                <Button variant="light" className="social-btn shadow-sm">
                  <FaFacebookF className="text-primary" size={20} />
                </Button>
                <Button variant="light" className="social-btn shadow-sm" onClick={onGoogleSignIn}>
                  <SiGmail className="text-danger" size={22} />
                </Button>
              </div>

              <p className="small mb-0">
                Don’t have an account?{' '}
                <Link to="/register" className="text-primary fw-bold text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>}
    </>

  );
}
