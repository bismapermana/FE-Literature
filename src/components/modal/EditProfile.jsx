import React, { useState } from "react";
import {
  Form,
  Modal,
  Image,
  Row,
  Col,
  Container,
  Button,
  Alert,
} from "react-bootstrap";
import profile from "../../assets/profile.png";
import { API } from "../../config/api";
import "./Modal.css";

const EditProfile = (props) => {
  const [preview, setPreview] = useState(null);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    picture: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "picture") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = new FormData();
      data.set("picture", input.picture[0]);
      data.set("fullName", input.fullName);
      data.set("email", input.email);
      data.set("phone", input.phone);
      data.set("address", input.address);

      const response = await API.patch("/user", data, config);
      props.getData();
      props.handleCloseModal();
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      setErrorMessage(error.response.data);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Modal
        className="overlay"
        show={props.showModalEdit}
        onHide={props.handleCloseModal}
        size="lg"
      >
        <Container className="w-100 p-5 background-modal">
          {alert && (
            <Alert variant="danger" style={{ height: "50px" }}>
              <p>Please Select Your Picture</p>
            </Alert>
          )}
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group>
                  <p style={{ color: "white" }} className="mb-1">
                    <b>Full Name</b>
                  </p>
                  <input
                    className="w-75 form-input p-2 rounded form-style"
                    type="text"
                    className="input-style"
                    name="fullName"
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <p style={{ color: "white" }} className="mb-1">
                    <b>Email</b>
                  </p>
                  <input
                    className="input-style"
                    type="text"
                    name="email"
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group>
                  <p style={{ color: "white" }} className="mb-1">
                    <b>Phone</b>
                  </p>
                  <input
                    className="input-style"
                    type="number"
                    name="phone"
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group>
                  <p style={{ color: "white" }} className="mb-1">
                    <b>Address</b>
                  </p>
                  <input
                    className="input-style"
                    type="textarea"
                    name="address"
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="d-flex flex-column h-100 justify-content-between">
                  <div>
                    {preview === null ? (
                      <>
                        <label>
                          <Image
                            src={profile}
                            style={{ cursor: "pointer" }}
                            className="mt-4 w-100 h-100"
                          />
                          <input
                            accept=".jpg,.jpeg,.png,.svg"
                            hidden
                            name="picture"
                            type="file"
                            onChange={handleOnChange}
                          />
                        </label>
                      </>
                    ) : (
                      <>
                        <label>
                          <Image
                            src={preview}
                            style={{
                              cursor: "pointer",
                              height: "250px",
                              width: "210px",
                            }}
                            className="mt-4"
                          />
                          <input
                            accept=".jpg,.jpeg,.png,.svg"
                            hidden
                            name="picture"
                            type="file"
                            onChange={handleOnChange}
                          />
                        </label>
                      </>
                    )}
                  </div>
                  <div className="mb-3">
                    <Button
                      style={{ color: "white" }}
                      onClick={handleOnSubmit}
                      className=" button-style"
                      variant="danger"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Modal>
    </div>
  );
};

export default EditProfile;
