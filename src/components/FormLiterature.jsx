import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { API } from "../config/api";
import "./Component.css";

const FormLiterature = () => {
  const [preview, setPreview] = useState(null);
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

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);

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
          <input
            onChange={handleOnChange}
            placeholder="Attach Book File"
            className="rounded input-form mb-3"
            type="file"
            name="doc"
          />
        </form>
        <div className="d-flex justify-content-end">
          <Button
            className="button-form"
            onClick={handleOnSubmit}
            variant="danger"
          >
            Add Literature
          </Button>
        </div>
      </Container>
    </>
  );
};

export default FormLiterature;
