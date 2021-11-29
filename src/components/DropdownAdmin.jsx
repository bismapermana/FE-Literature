import React, { useContext } from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import logout from "../assets/logout.png";
import polygon from "../assets/polygon.png";
import { AuthContext } from "../context/AuthContext";
import "./Component.css";

const DropdownAdmin = (props) => {
  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("token");
    history.push("/");
    props.setShowDropdown(false);
  };

  return (
    <>
      {props.showDropdown && (
        <div>
          <img className="polygon-dropdown" src={polygon} alt="" />
          <div
            onClick={() => props.setShowDropdown(false)}
            className="overlay-dropdown"
          />
          <div className="container-dropdown rounded shadow">
            <Dropdown.Item onClick={handleLogout}>
              <Image src={logout} className="mr-3 " />
              <span>
                <b>Logout</b>
              </span>
            </Dropdown.Item>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownAdmin;
