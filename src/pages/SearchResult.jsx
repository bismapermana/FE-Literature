import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Container, Form } from "react-bootstrap";
import Navbars from "../components/Navbars";
import action from "../assets/action.png";
import { API } from "../config/api";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./pages.css";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [searchbar, setSearchbar] = useState("");
  const history = useHistory();
  const { search } = useLocation();

  const handleOnChange = (e) => {
    setSearchbar("/literature?title=" + e.target.value);
  };

  const searchParams = new URLSearchParams(search);
  const title = searchParams.get("title");

  const dataFilter = data.filter((item) => {
    return item.title.toLowerCase().includes(title);
  });

  useEffect(() => {
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

    getData();
  }, []);

  const handleOnClick = (id) => {
    history.push("/details/" + id);
  };

  const findDuplicates = date.filter((item, idx) => item.indexOf(item) === idx);

  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
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
              <Form.Select size="sm" className="form-select">
                <option disabled>Date</option>
                {findDuplicates.map((item) => (
                  <option>{item}</option>
                ))}
              </Form.Select>
            </Form>
          </div>
          <Container style={{ width: "90%" }}>
            <Row>
              {dataFilter
                .filter((item) => item.status === "Approved")
                .map((item) => (
                  <Col md={3} className="mt-5 ">
                    <Card
                      style={{ cursor: "pointer", backgroundColor: "black" }}
                      className="w-100"
                      onClick={() => handleOnClick(item.id)}
                    >
                      <iframe
                        name="data"
                        height="300px"
                        width="100%"
                        src={item.attachment}
                      ></iframe>
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
