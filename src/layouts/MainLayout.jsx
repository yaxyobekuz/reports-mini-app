import React from "react";
import { Outlet } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <>
      <Outlet />

      <NavBar />
    </>
  );
};

export default MainLayout;
