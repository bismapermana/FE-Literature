import React, { useContext, useEffect, useState } from "react";
import Navbars from "../components/Navbars";
import { useHistory, useParams } from "react-router";
import { API } from "../config/api";
import { Container, Button, Alert } from "react-bootstrap";
import "./pages.css";
import download from "../assets/download.png";
import { saveAs } from "file-saver";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const DetailLiterature = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [checkCollections, setCheckCollections] = useState("");
  const [state, dispatch] = useContext(AuthContext);
  const history = useHistory();

  const getData = async () => {
    try {
      const response = await API.get("/document/" + id);
      setData(response.data.documents);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    checkCollection();
  }, []);

  const checkCollection = async () => {
    try {
      const response = await API.get("/checkCollection/" + id);
      setCheckCollections(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCollection = async () => {
    try {
      const response = await API.delete("/collection/" + id);
      if (response.status === 200) {
        setCheckCollections("available");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      if (response.status === 200) {
        setCheckCollections("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveFile = () => {
    saveAs(data.attachment, data.title);
  };

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
        <Navbars />
        <div className="d-flex w-100 justify-content-between p-5">
          <div>
            <Container>
              <iframe
                scrolling="no"
                width="450px"
                className="rounded"
                height="530px"
                src={data.attachment}
              ></iframe>
            </Container>
          </div>
          <div style={{ width: "40%" }}>
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
              <Button
                onClick={saveFile}
                className="button-download"
                variant="danger"
              >
                Download <img className="ml-1" src={download} alt="" />
              </Button>
            </div>
          </div>
          <div>
            {/* {state.user !== data.users.id ?  */}
            <div>
              {checkCollections === "available" ? (
                <Button
                  className="button-bookmark"
                  onClick={handleBookmark}
                  variant="danger"
                >
                  Add my Collection <FaRegBookmark />
                </Button>
              ) : (
                <Button
                  className="button-bookmark"
                  onClick={removeCollection}
                  variant="danger"
                >
                  Remove Collection <FaBookmark />
                </Button>
              )}
            </div>

            <></>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailLiterature;
