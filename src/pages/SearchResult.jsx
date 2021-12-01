import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Container, Form } from "react-bootstrap";
import Navbars from "../components/Navbars";
import action from "../assets/action.png";
import { API } from "../config/api";
import { useHistory, useLocation } from "react-router";
import { Document, Page } from "react-pdf";
import { Link } from "react-router-dom";
import "./pages.css";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const [searchbar, setSearchbar] = useState("/literature?title=");
  const history = useHistory();
  const { search } = useLocation();

  const handleOnChange = (e) => {
    setSearchbar("/literature?title=" + e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setSelectDate(e.target.value);
  };

  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("title");

  //  DATA FILTERING
  const dataFilter = data.filter((item) => {
    return item.title.toLowerCase().includes(title);
  });
  const filterDate = Array.from(new Set(date));

  const getData = async () => {
    try {
      const response = await API.get("/documents");

      setData(response.data.documents);

      const dateResponse = response.data.documents.map((item) => {
        return item.publicationDate.substring(0, 4);
      });
      setDate(dateResponse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleOnClick = (id) => {
    history.push("/details/" + id);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "black",
        }}
      >
        <Navbars />
        <div>
          <form>
            <div className="d-flex">
              <input
                className="p-2 input-result ml-3 mt-2 w-50"
                name="search"
                onChange={handleOnChange}
              />
              <Link to={searchbar}>
                <Button variant="danger" className="mt-2 ml-2">
                  <img src={action} alt="" />
                </Button>
              </Link>
            </div>
          </form>
        </div>

        <div className="mx-3 d-flex" style={{ backgroundColor: "black" }}>
          <div style={{ width: "10%" }}>
            <p className="text-anytime">Anytime</p>
            <Form>
              <Form.Select
                variant="dark"
                onChange={handleOnChangeDate}
                size="sm"
                className="form-select"
              >
                <option className="option-select" value="">
                  All
                </option>
                {filterDate.map((item) => (
                  <option className="option-select" value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </Form>
          </div>
          <Container className="mb-5" style={{ width: "90%" }}>
            <Row>
              {selectDate === ""
                ? dataFilter.map((item) => (
                    <Col md={3} className="mt-5 ">
                      <Card
                        style={{
                          cursor: "pointer",
                          backgroundColor: "black",
                          overflow: "hidden",
                        }}
                        className="w-100"
                        onClick={() => handleOnClick(item.id)}
                      >
                        <div className="container-pdf">
                          <Document file={item.attachment}>
                            <Page pageNumber={1} />
                          </Document>
                        </div>
                        <p className="result-text-title">{item.title}</p>
                        <div className="result-text-desc d-flex justify-content-between">
                          <span>{item.users.fullName}</span>
                          <span>{item.publicationDate.substring(0, 4)}</span>
                        </div>
                      </Card>
                    </Col>
                  ))
                : dataFilter
                    .filter(
                      (item) =>
                        item.publicationDate.substring(0, 4) === selectDate
                    )
                    .map((item) => (
                      <Col md={3} className="mt-5 ">
                        <Card
                          style={{
                            cursor: "pointer",
                            backgroundColor: "black",
                            overflow: "hidden",
                          }}
                          className="w-100"
                          onClick={() => handleOnClick(item.id)}
                        >
                          <Document file={item.attachment}>
                            <Page pageNumber={1} />
                          </Document>
                          <p className="result-text-title">{item.title}</p>
                          <div className="result-text-desc d-flex justify-content-between">
                            <span>{item.users.fullName}</span>
                            <span>{item.publicationDate.substring(0, 4)}</span>
                          </div>
                        </Card>
                      </Col>
                    ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
