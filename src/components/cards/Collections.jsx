import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { API } from "../../config/api";
import "./card.css";

const Collections = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.get("/collection");
        setData(response.data.collections);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Container className="mt-5">
        <p className="collection-text-header">My Collection</p>
        <Row>
          {data.map((item) => (
            <Col md={2} className="mx-3">
              <iframe
                name="data"
                className="rounded"
                width="200px"
                height="270px"
                src={item.documents.attachment}
              ></iframe>
              <p className="collection-text-title">{item.documents.title}</p>
              <div
                style={{ width: "200px" }}
                className="d-flex justify-content-between collection-text-detail"
              >
                <p>{item.documents.author}</p>
                <p>{item.documents.publicationDate.substring(0, 4)}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Collections;
