import React from "react";
import { Outlet } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />

      <NavBar />
    </div>
  );
};

export default MainLayout;
