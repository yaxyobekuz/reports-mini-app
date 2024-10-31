import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./features/dataSlice";

export default configureStore({
  reducer: {
    data: dataSlice,
  },
});
