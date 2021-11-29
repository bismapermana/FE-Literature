import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import email from "../../assets/email.png";
import gender from "../../assets/gender.png";
import address from "../../assets/address.png";
import phone from "../../assets/phone.png";
import "./card.css";

const User = ({ data, getData }) => {
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
              <Image
                style={{ width: "226px", height: "250px", marginBottom: "5px" }}
                src={data.profilePicture}
              />
            </div>
            <Button className="button-user" variant="danger">
              Change Photo Profile
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default User;
