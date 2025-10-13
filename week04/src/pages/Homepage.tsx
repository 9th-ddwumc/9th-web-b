import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBer";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomePage;
