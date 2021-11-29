import React from "react";
import FormLiterature from "../components/FormLiterature";

import Navbars from "../components/Navbars";

const AddLiterature = () => {
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
        <Navbars />
        <FormLiterature />
      </div>
    </>
  );
};

export default AddLiterature;
