import React, { useState } from "react";
import { Image, Button } from "react-bootstrap";
import Navbars from "../components/Navbars";
import logo from "../assets/vector.svg";
import action from "../assets/action.png";
import { Link } from "react-router-dom";
import "./pages.css";

const Search = () => {
  const [form, setForm] = useState("/literature?title=");

  const handleOnChange = (e) => {
    setForm("/literature?title=" + e.target.value);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
      <Navbars />
      <div
        style={{ height: "80vh" }}
        className="d-flex justify-content-center align-item-center"
      >
        <div className="align-self-center">
          <Image src={logo} style={{ width: "500px" }} />
          <form>
            <div style={{ display: "flex" }}>
              <input
                placeholder="Search for literature"
                className="p-2 input-search rounded mt-3"
                name="search"
                onChange={handleOnChange}
              />
              <Link to={form}>
                <Button variant="danger" className="mt-3 ml-2 button-search">
                  <img src={action} alt="" />
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
