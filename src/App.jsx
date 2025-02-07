import { useEffect } from "react";

// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Add from "./pages/Add";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import useTelegram from "./hooks/useTelegram";

// Layouts
import MainLayout from "./layouts/MainLayout";

const App = () => {
  const { user, tg } = useTelegram() || {};
  useEffect(() => tg.setHeaderColor("#f5f5f5"), []);
  useEffect(() => tg.setBottomBarColor("#f5f5f5"), []);
  if (!user?.id) return "Siz uchun kirish taqiqlandi!";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Add />} />
        <Route path="/hisobotlar" element={<Reports />} />
        <Route path="/sozlamalar" element={<Settings />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
