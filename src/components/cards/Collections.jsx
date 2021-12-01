import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { API } from "../../config/api";
import { Document, Page } from "react-pdf";
import "./card.css";
import { useHistory } from "react-router";

const Collections = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const handleOnClick = (id) => {
    history.push("/details/" + id);
  };

  const getData = async () => {
    try {
      const response = await API.get("/collection");
      setData(response.data.collections);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Container className="mt-5">
        <p className="collection-text-header ml-3">My Collection</p>
        <Row>
          {data.map((item) => (
            <Col md={3} className="mx-3">
              <Card
                style={{
                  backgroundColor: "black",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => handleOnClick(item.documents.id)}
              >
                <Document file={item.documents.attachment}>
                  <Page pageNumber={1} />
                </Document>

                <p className="collection-text-title">{item.documents.title}</p>
                <div
                  style={{ width: "200px" }}
                  className="d-flex justify-content-between collection-text-detail"
                >
                  <p>{item.documents.author}</p>
                  <p>{item.documents.publicationDate.substring(0, 4)}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Collections;
