import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { API } from "../../config/api";
import "./card.css";
import { Document, Page } from "react-pdf";

const Literature = () => {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const getData = async () => {
    try {
      const response = await API.get("/document");
      console.log(response);
      setData(response.data.documents);
      setDataFilter(response.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const FilterApproved = () => {
    const datas = data.filter((item) => item.status === "Approved");
    setDataFilter(datas);
  };

  const FilterCanceled = () => {
    const datas = data.filter((item) => item.status === "Canceled");
    setDataFilter(datas);
  };
  const FilterWaiting = () => {
    const datas = data.filter(
      (item) => item.status === "waiting to be verified"
    );
    setDataFilter(datas);
  };

  return (
    <>
      <Container className="mt-5">
        <p className="literature-title">My Literature</p>
        <Button variant="danger" onClick={FilterApproved}>
          Approved
        </Button>
        <Button variant="danger" className="mx-3" onClick={FilterCanceled}>
          Canceled
        </Button>
        <Button variant="danger" onClick={FilterWaiting}>
          Pending
        </Button>
        <div
          style={{ backgroundColor: "#252525", minHeight: "400px" }}
          className=" mt-2 p-5 "
        >
          <Row className="justify-content-around">
            {dataFilter.map((item) => (
              <>
                <Col md={3} className="mb-2 ">
                  <Card
                    style={{ backgroundColor: "#252525", overflow: "hidden" }}
                  >
                    <Document file={item.attachment}>
                      <Page pageNumber={1} />
                    </Document>

                    <p className="literature-text-title">{item.title}</p>
                    <div className="d-flex justify-content-between literature-text-desc">
                      <p>{item.author}</p>
                      <p>{item.publicationDate.substring(0, 4)}</p>
                    </div>
                  </Card>
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
