/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isGroupVisible: false,
  dashboardData: null,
  showDashboard: false,
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
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setShowDashboard: (state, action) => {
      state.showDashboard = action.payload;
    },
  },
});

export const {
  setLoading,
  setIsGroupVisible,
  setDashboardData,
  setShowDashboard,
} = Slice.actions;
export default Slice.reducer;
