import React, { useEffect } from "react";

// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";

// Redux
import {
  updateData,
  updateError,
  updateLoader,
} from "./store/features/dataSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const App = () => {
  const today = new Date();
  const dispatch = useDispatch();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiUrl = `${apiBaseUrl}?start=${new Date("01-01-1900")}&end=${today}`;

  // Fetch data from API
  const fetchData = () => {
    // Add loader
    dispatch(updateLoader(true));

    axios
      .get(apiUrl)
      .then((res) => dispatch(updateData(res.data)))
      .catch(() => dispatch(updateError(true)))
      .finally(() => dispatch(updateLoader(false)));
  };

  useEffect(() => fetchData(), []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/:p?" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
