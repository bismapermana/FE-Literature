import React, { useState } from "react";
import { Navbar, Container, Image, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import landingPage from "../assets/landingPage.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "./pages.css";

const Landing = () => {
  const [showLogin, setshowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showModalLogin = () => {
    setshowLogin(true);
    setShowRegister(false);
  };

  const showModalRegister = () => {
    setShowRegister(true);
    setshowLogin(false);
  };

  return (
    <>
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar style={{ backgroundColor: "black" }}>
          <Container>
            <img alt="" src={logo} className="d-inline-block align-top" />
          </Container>
        </Navbar>

        <div
          className="mx-5"
          style={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ color: "white" }}>
            <div className="text-title-landing">
              <p>Source of Intelegent</p>
            </div>
            <div className="text-desc-landing">
              <p>
                Sign-up and receive unlimited access to all of your literatur -
                share your literature
              </p>
            </div>

            <div>
              <Button
                onClick={showModalLogin}
                className="mx-3 button-login"
                size="lg"
                variant="danger"
              >
                Sign In
              </Button>
              <Button
                onClick={showModalRegister}
                className="button-register"
                size="lg"
                variant="danger"
              >
                Sign Up
              </Button>
            </div>
          </div>
          <Image src={landingPage} style={{ width: "550px" }} />
        </div>
      </div>
      <Login
        showModalRegister={showModalRegister}
        showLogin={showLogin}
        setshowLogin={setshowLogin}
      />
      <Register
        showModalLogin={showModalLogin}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      />
    </>
  );
};

export default Landing;
