/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isGroupVisible: false,
};

const Slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsGroupVisible: (state, action) => {
      state.isGroupVisible = action.payload;
    },
  },
});

export const { setLoading, setIsGroupVisible } =
  Slice.actions;
export default Slice.reducer;
