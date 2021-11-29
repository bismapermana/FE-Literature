import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Table,
  Pagination,
  Button,
} from "react-bootstrap";
import logo from "../../assets/logo.png";
import Avatar from "react-avatar";
import DropdownAdmin from "../../components/DropdownAdmin";
import { API } from "../../config/api";
import done from "../../assets/done.png";
import canceled from "../../assets/cancel.png";

const Admin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataEachPage] = useState(5);

  const getData = async () => {
    try {
      const response = await API.get("/documents");
      setData(response.data.documents.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleShow = () => {
    setShowDropdown(true);
  };

  const indexOfLastData = currentPage * dataEachPage;
  const indexOfFirstData = indexOfLastData - dataEachPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(data.length / dataEachPage); i++) {
    pageNumbers.push(i);
  }

  const validationData = async (id, action) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await API.patch(
        "/document/" + id,
        { status: action },
        config
      );

      console.log(response);

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ minHeight: "110vh", backgroundColor: "#E5E5E5" }}>
        <div
          className="py-3 px-5"
          style={{ backgroundColor: "black", width: "100%" }}
        >
          <Row>
            <Col md={2}>
              <Image src={logo} />
            </Col>
            <Col md={9}></Col>
            <Col md={1} className="p-2">
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={handleShow}
                name="admin"
                size="45px"
                round
              />
            </Col>
          </Row>
        </div>
        <Container className="mt-5">
          <div>
            <h1>Book Verification</h1>
          </div>
          <div className="mt-3">
            <Table striped bordered hover size="md" variant="light">
              <thead>
                <tr>
                  <th className="py-4">No</th>
                  <th className="py-4">Users</th>
                  <th className="py-4">Author</th>
                  <th className="py-4">ISBN</th>
                  <th className="py-4">Literature</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.users.fullName}</td>
                    <td>{item.author}</td>
                    <td>{item.ISBN}</td>
                    <td>
                      <a href={item.attachment}>{item.title}.pdf</a>
                    </td>
                    <td>
                      {item.status === "waiting to be verified" ? (
                        <p style={{ color: "orange", fontWeight: "bolder" }}>
                          {item.status}
                        </p>
                      ) : item.status === "Canceled" ? (
                        <p style={{ color: "red", fontWeight: "bolder" }}>
                          {item.status}
                        </p>
                      ) : (
                        <p style={{ color: "green", fontWeight: "bolder" }}>
                          {item.status}
                        </p>
                      )}
                    </td>
                    <td>
                      {item.status === "waiting to be verified" ? (
                        <div className="d-flex justify-content-around">
                          <Button
                            onClick={() => validationData(item.id, "Canceled")}
                            variant="danger"
                            style={{ width: "40%", color: "black" }}
                          >
                            <b> Cancel</b>
                          </Button>
                          <Button
                            onClick={() => validationData(item.id, "Approved")}
                            variant="success"
                            style={{ width: "40%", color: "black" }}
                          >
                            <b> Approve </b>
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          {item.status === "Approved" ? (
                            <Image style={{ width: "25px" }} src={done} />
                          ) : (
                            <Image style={{ width: "25px" }} src={canceled} />
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {pageNumbers.map((item) => (
                <Pagination.Item onClick={() => paginate(item)}>
                  {item}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Container>
      </div>
      <DropdownAdmin
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
    </>
  );
};

export default Admin;
