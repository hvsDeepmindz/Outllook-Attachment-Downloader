/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setIsGroupVisible,
  setDashboardData,
  setShowDashboard,
  setCurrentPage,
  setItemsPerPage,
  setMessageTableData,
  setSyncPendingItems,
  setSearchText,
} from "./Slice";
import { useEffect } from "react";
import { userLogin, userLogout } from "../../../config";
import { DashboardData } from "../APIs/DashboardAPI";
import { toast } from "react-toastify";
import { MessageData } from "../APIs/MessagesAPI";
import { useNavigate } from "react-router-dom";
import { SyncData, SyncStatus } from "../APIs/SyncAPI";
import { SearchMessage } from "../APIs/SearchMessageAPI";

const Handlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    isGroupVisible,
    dashboardData,
    showDashboard,
    currentPage,
    itemsPerPage,
    messageTableData,
    totalItems,
    totalPages,
    syncPendingItems,
    searchText,
  } = useSelector((state) => state.app);

  const handleLoad = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  };

  const handleLogin = () => {
    toast.success("Login successfully!");
    window.location.href = userLogin;
  };

  const handleLogout = () => {
    toast.success("Logout successfully!");
    setTimeout(() => {
      window.location.href = userLogout;
    }, 1000);
  };

  const showGroupMenu = () => {
    dispatch(setIsGroupVisible(true));
  };

  const hideGroupMenu = () => {
    dispatch(setIsGroupVisible(false));
  };

  const getInitials = (name) => {
    if (!name) return "NA";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  };

  // API Func

  const fetchDashboardData = async () => {
    dispatch(setLoading(true));
    try {
      const { status, data } = await DashboardData();
      if (status === 401) {
        toast.error("Not authenticated");
        dispatch(setDashboardData(null));
        dispatch(setShowDashboard(false));
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }
      if (status !== 200) {
        dispatch(setDashboardData(null));
        dispatch(setShowDashboard(false));
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return;
      }
      dispatch(setDashboardData(data));
      dispatch(setShowDashboard(true));
    } catch {
      toast.error("Failed to fetch dashboard data");
      dispatch(setDashboardData(null));
      dispatch(setShowDashboard(false));
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMessageData = async (
    page = currentPage,
    perPage = itemsPerPage
  ) => {
    dispatch(setLoading(true));
    const res = await MessageData(page, perPage);
    if (res?.table_data) {
      dispatch(setMessageTableData(res));
      dispatch(setShowDashboard(true));
    } else {
      dispatch(setShowDashboard(false));
      toast.error("Not Authorized");
      setTimeout(() => navigate("/login"), 2000);
    }
    dispatch(setLoading(false));
  };

  const fetchSyncData = async () => {
    try {
      const initialStatus = await SyncStatus();
      const syncedBefore = initialStatus?.total_synced_items || 0;
      dispatch(setSyncPendingItems(initialStatus?.total_items - syncedBefore));
      await new Promise((res) => setTimeout(res, 0));
      dispatch(setLoading(true));

      await SyncData();

      const finalStatus = await SyncStatus();
      const syncedAfter = finalStatus?.total_synced_items || 0;
      const newlySynced = Math.max(syncedAfter - syncedBefore, 0);

      if (newlySynced > 0) {
        toast.success(`Synced ${newlySynced} items successfully...`);
      } else {
        toast.info("Already up to date");
      }

      fetchDashboardData();
    } catch {
      toast.error("Sync failed");
    } finally {
      dispatch(setLoading(false));
      dispatch(setSyncPendingItems(0));
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = messageTableData;

  const updateTableData = (payload) => {
    if (payload?.table_data && payload?.meta_data) {
      dispatch(setMessageTableData(payload));
    } else {
      dispatch(
        setMessageTableData({
          table_data: payload,
          meta_data: {
            total_items: totalItems,
            total_pages: totalPages,
          },
        })
      );
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      fetchMessageData(page, itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (value) => {
    dispatch(setItemsPerPage(value));
    dispatch(setCurrentPage(1));
    fetchMessageData(1, value);
  };

  const handleSearchTextChange = (text) => {
    dispatch(setSearchText(text));
  };

  const handleSearchSubmit = async () => {
    if (searchText.trim() === "") {
      fetchMessageData(1, itemsPerPage);
      return;
    }
    dispatch(setLoading(true));
    const res = await SearchMessage({
      text: searchText,
      currentPage: 1,
      itemsPerPage,
    });
    if (res?.table_data) {
      dispatch(setMessageTableData(res));
      dispatch(setCurrentPage(1));
    }
    dispatch(setLoading(false));
  };

  return {
    isLoading,
    handleLoad,
    handleLogin,
    handleLogout,
    isGroupVisible,
    showGroupMenu,
    hideGroupMenu,
    dashboardData,
    getInitials,
    showDashboard,
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    messageTableData,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
    updateTableData,
    syncPendingItems,
    searchText,
    handleSearchTextChange,
    handleSearchSubmit,
    // Api func
    fetchDashboardData,
    fetchMessageData,
    fetchSyncData,
  };
};

export default Handlers;
