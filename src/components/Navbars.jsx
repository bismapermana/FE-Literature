import React, { useContext } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbars = () => {
  const [state, dispatch] = useContext(AuthContext);

  const history = useHistory();

  const handleOnLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleOnProfile = () => {
    history.push("/profile");
  };
  const handLiterature = () => {
    history.push("/addLiterature");
  };

  const handleOnCollection = () => {
    history.push("/collection");
  };

  const handleHome = () => {
    history.push("/search");
  };

  return (
    <>
      <Navbar
        className="d-flex p-4 justify-content-between"
        expand="lg"
        style={{ backgroundColor: "black" }}
        variant="dark"
      >
        <Nav className="me-auto">
          <Nav.Link onClick={handleOnProfile}>Profile</Nav.Link>
          <Nav.Link onClick={handleOnCollection}>My Collection</Nav.Link>
          <Nav.Link onClick={handLiterature}>Add Literature</Nav.Link>
          <Nav.Link onClick={handleOnLogout}>Logout</Nav.Link>
        </Nav>
        <div>
          <Image
            onClick={handleHome}
            src={logo}
            style={{ cursor: "pointer", width: "150px", marginTop: "-15px" }}
          />
        </div>
      </Navbar>
    </>
  );
};

export default Navbars;
