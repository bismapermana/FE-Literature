import React, { useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import email from "../../assets/email.png";
import gender from "../../assets/gender.png";
import address from "../../assets/address.png";
import phone from "../../assets/phone.png";
import "./card.css";
import profile from "../../assets/profile.png";
import EditProfile from "../modal/EditProfile";

const User = ({ data, getData }) => {
  const [showModalEdit, setModalEdit] = useState(false);
  const handleShowModal = () => setModalEdit(true);
  const handleCloseModal = () => setModalEdit(false);

  return (
    <>
      <Container className="mt-5">
        <p className="literature-title">Profile</p>
        <div
          style={{ backgroundColor: "#252525" }}
          className="d-flex mt-5 p-5 rounded justify-content-between w-100"
        >
          <div className="align-self-end">
            <ul style={{ color: "white" }}>
              <li>
                <div className="d-flex ">
                  <Image
                    src={email}
                    className="mt-2"
                    style={{ width: "30px", height: "27px" }}
                  />
                  <div className="ml-3">
                    <span className="user-text-title">{data.email}</span>
                    <p className="user-text-desc">Email</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex ">
                  <Image
                    src={gender}
                    className="mt-2"
                    style={{ width: "30px", height: "33px" }}
                  />
                  <div className="ml-3">
                    <span className="user-text-title">{data.gender}</span>
                    <p className="user-text-desc">Gender</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex ">
                  <Image
                    src={address}
                    className="mt-2"
                    style={{ width: "30px", height: "33px" }}
                  />
                  <div className="ml-3">
                    <span className="user-text-title">{data.address}</span>
                    <p className="user-text-desc">Address</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex ">
                  <Image
                    src={phone}
                    className="mt-2"
                    style={{ width: "30px", height: "33px" }}
                  />
                  <div className="ml-3">
                    <span className="user-text-title">{data.phone}</span>
                    <p className="user-text-desc">Phone</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div>
              {data.profilePicture === null ? (
                <Image
                  style={{
                    width: "226px",
                    height: "250px",
                    marginBottom: "5px",
                  }}
                  src={profile}
                />
              ) : (
                <Image
                  style={{
                    width: "226px",
                    height: "250px",
                    marginBottom: "5px",
                  }}
                  src={data.profilePicture}
                />
              )}
            </div>
            <Button
              onClick={handleShowModal}
              className="button-user"
              variant="danger"
            >
              Change Profile
            </Button>
          </div>
        </div>
      </Container>
      <EditProfile
        showModalEdit={showModalEdit}
        handleCloseModal={handleCloseModal}
        getData={getData}
      />
    </>
  );
};

export default User;
