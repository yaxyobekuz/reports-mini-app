import React from "react";
import { Outlet } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pb-24">
        <Outlet />
      </div>

      <NavBar />
    </div>
  );
};

export default MainLayout;
