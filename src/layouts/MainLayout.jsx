import { Outlet } from "react-router-dom";

// Components
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen pb-16">
      <Outlet />
      <NavBar />
    </div>
  );
};

export default MainLayout;
