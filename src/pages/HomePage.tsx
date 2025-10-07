import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomePage;