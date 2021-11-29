import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../config/api";
import "./card.css";

const Literature = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await API.get("/document");
      console.log(response);
      setData(response.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <>
      <Container className="mt-5">
        <p className="literature-title">My Literature</p>
        <div
          style={{ backgroundColor: "#252525" }}
          className="d-flex mt-5 p-5 rounded justify-content-between w-100"
        >
          <Row className="justify-content-around">
            {data.map((item) => (
              <>
                <Col md={3} className="mb-2 w-100">
                  <iframe
                    name={item.title}
                    height="270px"
                    width="230px"
                    src={item.attachment}
                  ></iframe>
                  <p className="literature-text-title">{item.title}</p>
                  <div className="d-flex justify-content-between literature-text-desc">
                    <p>{item.author}</p>
                    <p>{item.publicationDate.substring(0, 4)}</p>
                  </div>
                </Col>
              </>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Literature;
