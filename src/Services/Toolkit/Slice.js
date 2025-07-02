/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isGroupVisible: false,
  dashboardData: null,
  showDashboard: false,
  currentPage: 1,
  itemsPerPage: 10,
  messageTableData: [],
  totalItems: 0,
  totalPages: 0,
  syncPendingItems: 0,
  searchText: "",
  historyStack: [],
  selectedAttachment: null,
  attachmentTableData: [],
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
    setMessageTableData: (state, action) => {
      state.messageTableData = action.payload.table_data || [];
      state.totalItems = action.payload.meta_data?.total_items || 0;
      state.totalPages = action.payload.meta_data?.total_pages || 0;
    },
    setSyncPendingItems: (state, action) => {
      state.syncPendingItems = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    pushToHistoryStack: (state, action) => {
      state.historyStack.push(action.payload);
    },
    popFromHistoryStack: (state) => {
      state.historyStack.pop();
    },
    setSelectedAttachment: (state, action) => {
      state.selectedAttachment = action.payload;
    },
    setAttachmentTableData: (state, action) => {
      state.attachmentTableData = action.payload;
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
  setMessageTableData,
  setSyncPendingItems,
  setSearchText,
  pushToHistoryStack,
  popFromHistoryStack,
  setSelectedAttachment,
  setAttachmentTableData,
} = Slice.actions;
export default Slice.reducer;
