/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isGroupVisible: false,
  dashboardData: null,
  showDashboard: false,
  currentPage: 1,
  itemsPerPage: 10,
  tableData: [],
  messageData: [],
  totalMessageCount: 0,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setMessageData: (state, action) => {
      state.messageData = action.payload.data;
      state.totalMessageCount = action.payload.total;
    },
  },
});

export const {
  setLoading,
  setIsGroupVisible,
  setDashboardData,
  setShowDashboard,
  setCurrentPage,
  setItemsPerPage,
  setTableData,
  setMessageData,
} = Slice.actions;
export default Slice.reducer;
