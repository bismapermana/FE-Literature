import React, { useEffect, useState } from "react";
import Navbars from "../components/Navbars";
import { useParams } from "react-router";
import { API } from "../config/api";
import { Container, Button } from "react-bootstrap";
import "./pages.css";
import download from "../assets/download.png";
import bookmark from "../assets/mark.png";

const DetailLiterature = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.get("/document/" + id);
        setData(response.data.documents);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleBookmark = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.post(
        "/collection",
        { idDocument: id },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
        <Navbars />
        <div className="d-flex w-100 p-5">
          <div style={{ width: "40%" }}>
            <Container>
              <iframe
                width="450px"
                className="rounded"
                height="530px"
                src={data.attachment}
              ></iframe>
            </Container>
          </div>
          <div style={{ width: "45%" }}>
            <div>
              <p className="title-text">{data.title}</p>
              <p className="detail-text">{data.author}</p>
            </div>
            <div className="my-4">
              <p className="title-text">Publication date</p>
              <p className="detail-text">
                {new Date(data.publicationDate).toLocaleDateString()}
              </p>
            </div>
            <div className="my-4">
              <p className="title-text">Pages</p>
              <p className="detail-text">{data.page}</p>
            </div>
            <div>
              <p style={{ color: "#AF2E1C" }} className="title-text">
                ISBN
              </p>
              <p className="detail-text">12928</p>
            </div>
            <div className="">
              <Button className="button-download" variant="danger">
                Download <img className="ml-1" src={download} alt="" />
              </Button>
            </div>
          </div>
          <div style={{ width: "15%" }}>
            <div>
              <Button
                className="button-bookmark"
                onClick={handleBookmark}
                variant="danger"
              >
                Add my Collection <img className="ml-1" src={bookmark} alt="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLiterature;
