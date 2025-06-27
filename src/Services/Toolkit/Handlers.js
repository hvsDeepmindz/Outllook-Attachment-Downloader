/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setIsGroupVisible,
  setDashboardData,
  setShowDashboard,
  setCurrentPage,
  setItemsPerPage,
  setTableData,
  setMessageData,
} from "./Slice";
import { useEffect } from "react";
import { userLogin } from "../../../config";
import { DashboardData } from "../APIs/DashboardAPI";
import { toast } from "react-toastify";
import { MessageData } from "../APIs/MessagesAPI";
import { useNavigate } from "react-router-dom";

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
    tableData,
    messageData,
  } = useSelector((state) => state.app);

  const handleLoad = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  };

  const handleLogin = () => {
    window.location.href = userLogin;
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
    if (Array.isArray(res) && res.length > 0) {
      dispatch(
        setMessageData({ data: res, total: res[0]?.total_message_count || 0 })
      );
      dispatch(setShowDashboard(true));
    } else {
      dispatch(setShowDashboard(false));
      toast.error("Not Authorized");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    dispatch(setLoading(false));
  };

  const totalPages = Math.ceil((tableData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData?.slice(startIndex, endIndex) || [];

  const updateTableData = (data) => {
    dispatch(setTableData(data));
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (value) => {
    dispatch(setItemsPerPage(value));
    fetchMessageData(1, value);
  };

  return {
    isLoading,
    handleLoad,
    handleLogin,
    isGroupVisible,
    showGroupMenu,
    hideGroupMenu,
    dashboardData,
    fetchDashboardData,
    getInitials,
    showDashboard,
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    tableData,
    paginatedData,
    handlePageChange,
    handleItemsPerPageChange,
    updateTableData,
    messageData,
    fetchMessageData,
  };
};

export default Handlers;
