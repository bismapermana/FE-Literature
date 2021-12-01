import React, { useContext, useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { API, setAuthToken } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import "./Modal.css";

const Register = ({ showRegister, setShowRegister, showModalLogin }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        config: {
          "Content-type": "application/json",
        },
      };
      const response = await API.post("/register", form, config);
      setAuthToken(response.data.token);
      const getData = await API.get("/user");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: getData.data.users,
      });
      localStorage.setItem("token", response.data.token);

      history.push("/search");

      setShowRegister(false);
    } catch (error) {
      const message = error.response.data.message;
      setErrorAlert(true);
      setErrorMessage(message);
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
    }
  };

  return (
    <>
      <Modal
        className="overlay"
        show={showRegister}
        onHide={() => setShowRegister(false)}
      >
        <Modal.Header
          style={{ marginBottom: "-15px" }}
          className=" font-weight-bold background-modal"
        >
          <h1 style={{ color: "white" }}>Sign Up</h1>
        </Modal.Header>
        <Modal.Body className="background-modal">
          {errorAlert && (
            <Alert clos variant="danger" style={{ height: "50px" }}>
              <p>{errorMessage}</p>
            </Alert>
          )}
          <form>
            <input
              onChange={handleOnChange}
              placeholder="FullName"
              type="text"
              name="fullName"
              className="rounded input-styles mb-3"
            />
            <input
              onChange={handleOnChange}
              placeholder="Email"
              type="email"
              name="email"
              className="rounded input-styles mb-3"
            />

            <input
              onChange={handleOnChange}
              placeholder="Password"
              type="password"
              name="password"
              className="rounded input-styles mb-3"
            />
            <input
              onChange={handleOnChange}
              placeholder="Phone"
              type="number"
              name="phone"
              className="rounded input-styles mb-3"
            />
            <select
              className="rounded input-styles mb-3"
              type="select"
              name="gender"
              onChange={handleOnChange}
            >
              <option
                style={{
                  color: "black",
                }}
                value="male"
                disabled
                selected
              >
                Gender
              </option>
              <option
                style={{
                  color: "black",
                }}
                value="male"
              >
                Male
              </option>
              <option
                style={{
                  color: "black",
                }}
                value="female"
              >
                Female
              </option>
            </select>
            <input
              placeholder="Address"
              className="rounded input-styles"
              type="text"
              name="address"
              onChange={handleOnChange}
            />
          </form>
          <Button
            onClick={handleOnSubmit}
            variant="danger"
            className="button-style"
          >
            Sign Up
          </Button>
          <p className="mt-2 text-center" style={{ color: "white" }}>
            Already have an account?{" "}
            <b
              onClick={showModalLogin}
              style={{ color: "#AF2E1C", cursor: "pointer" }}
            >
              klik here
            </b>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
