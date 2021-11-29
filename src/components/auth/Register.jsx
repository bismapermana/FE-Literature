import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { API } from "../../config/api";
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
      console.log(response);

      setShowRegister(false);
    } catch (error) {
      console.log(error);
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
          <form>
            <input
              onChange={handleOnChange}
              placeholder="FullName"
              type="text"
              name="fullName"
              className="rounded input-style mb-3"
            />
            <input
              onChange={handleOnChange}
              placeholder="Email"
              type="email"
              name="email"
              className="rounded input-style mb-3"
            />

            <input
              onChange={handleOnChange}
              placeholder="Password"
              type="password"
              name="password"
              className="rounded input-style mb-3"
            />
            <input
              onChange={handleOnChange}
              placeholder="Phone"
              type="number"
              name="phone"
              className="rounded input-style mb-3"
            />
            <input
              placeholder="gender"
              className="rounded input-style mb-3"
              type="text"
              name="gender"
              onChange={handleOnChange}
            />
            <input
              placeholder="Address"
              className="rounded input-style"
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
