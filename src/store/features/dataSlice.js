import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: {
      day: null,
      all: null,
      week: null,
      month: null,
    },
    error: false,
    loader: true,
  },

  reducers: {
    updateData: (state, action) => {
      const { data, type } = action.payload;
      state.data[type] = data;
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
