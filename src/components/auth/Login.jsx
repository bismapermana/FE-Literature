import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { setAuthToken, API } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";
import "./Modal.css";

const Login = ({ showLogin, setshowLogin, showModalRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();

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
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.post("/login", form, config);
      setAuthToken(response.data.users.token);
      const getData = await API.get("/user");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: getData.data.users,
      });

      localStorage.setItem("token", response.data.users.token);
      setshowLogin(false);

      if (response.status === 200) {
        if (response.data.users.status === "admin") {
          history.push("/admin");
        } else {
          return history.push("/search");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="overlay"
        show={showLogin}
        onHide={() => setshowLogin(false)}
      >
        <Modal.Header
          style={{ marginBottom: "-15px" }}
          className=" font-weight-bold background-modal"
        >
          <h1 style={{ color: "white" }}>Sign In</h1>
        </Modal.Header>
        <Modal.Body className="background-modal">
          <form>
            <input
              placeholder="Email"
              className="rounded mb-3 input-style"
              type="email"
              name="email"
              onChange={handleOnChange}
            />
            <input
              placeholder="Password"
              className="rounded input-style"
              type="password"
              name="password"
              onChange={handleOnChange}
            />
          </form>
          <Button
            onClick={handleOnSubmit}
            variant="danger"
            className="button-style"
          >
            Sign In
          </Button>
          <p className="mt-2 text-center" style={{ color: "white" }}>
            Do not have account?{" "}
            <b
              onClick={showModalRegister}
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

export default Login;
