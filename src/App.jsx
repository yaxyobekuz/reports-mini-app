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
  const { id } = useTelegram()?.user || {};

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
