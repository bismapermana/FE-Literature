import React, { useEffect, useState } from "react";
import Literature from "../components/cards/Literature";
import User from "../components/cards/User";
import Navbars from "../components/Navbars";
import { API } from "../config/api";

const Profile = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await API.get("/user");
      setData(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="pb-5"
      style={{ minHeight: "100vh", backgroundColor: "black" }}
    >
      <Navbars />
      <User getData={getData} data={data} />
      <Literature />
    </div>
  );
};

export default Profile;
