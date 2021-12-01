import React, { useState } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { API } from "../config/api";
import "./Component.css";
import attach from "../assets/attach.png";
import { useHistory } from "react-router";
import { Document, Page } from "react-pdf";
import swal from "sweetalert";

const FormLiterature = () => {
  const [preview, setPreview] = useState(null);
  const history = useHistory();
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    page: "",
    ISBN: "",
    author: "",
    doc: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "doc") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const data = new FormData();
      data.set("doc", form.doc[0]);
      data.set("title", form.title);
      data.set("publicationDate", form.publicationDate);
      data.set("page", form.page);
      data.set("ISBN", form.ISBN);
      data.set("author", form.author);

      const response = await API.post("/document", data, config);

      if (response.status === 200) {
        swal("Success!", "success");
        history.push("./search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-3">
        <p className="text-title-form">Add Literature</p>
        <form>
          <input
            onChange={handleOnChange}
            placeholder="Title"
            type="text"
            name="title"
            className="rounded input-form mb-3 "
          />
          <input
            onChange={handleOnChange}
            placeholder="Publication Date"
            className="rounded input-form mb-3"
            type="date"
            name="publicationDate"
          />
          <input
            onChange={handleOnChange}
            placeholder="Pages"
            className="rounded input-form mb-3"
            type="number"
            name="page"
          />
          <input
            onChange={handleOnChange}
            placeholder="ISBN"
            className="rounded input-form mb-3"
            type="number"
            name="ISBN"
          />
          <input
            onChange={handleOnChange}
            placeholder="Author"
            className="rounded input-form mb-3"
            name="author"
          />
          <div className="d-flex justify-content-between">
            {preview === null ? (
              <label className="ml-3">
                <div className="container-image rounded">
                  <div>
                    <p style={{ fontSize: "15px" }}>
                      <b>Attach Here</b>
                    </p>
                  </div>

                  <div>
                    <Image src={attach} className="image-style" fluid />
                  </div>
                </div>
                <input
                  onChange={handleOnChange}
                  placeholder="Attach Book File"
                  className="rounded input-form-file mb-3"
                  type="file"
                  name="doc"
                  hidden
                />
              </label>
            ) : (
              <div
                style={{ overflow: "hidden", width: "270px", height: "330px" }}
              >
                <Document file={preview}>
                  <Page pageNumber={1} />
                </Document>
              </div>
            )}

            <Button
              className="button-form"
              onClick={handleOnSubmit}
              variant="danger"
            >
              Add Literature
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default FormLiterature;
