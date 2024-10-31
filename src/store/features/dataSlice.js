import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    error: false,
    loader: true,
  },

  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },

    updateLoader: (state, action) => {
      state.loader = action.payload;
    },

    updateError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateData, updateError, updateLoader } = dataSlice.actions;

export default dataSlice.reducer;
