import React from "react";
import Navbars from "../components/Navbars";
import Collections from "../components/cards/Collections";

const Collection = () => {
  return (
    <>
      <div style={{ minHeight: "100vh", backgroundColor: "black" }}>
        <Navbars />
        <Collections />
      </div>
    </>
  );
};

export default Collection;
