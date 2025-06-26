/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setIsGroupVisible,
  setDashboardData,
  setShowDashboard,
} from "./Slice";
import { useEffect } from "react";
import { userLogin } from "../../../config";
import { DashboardData } from "../APIs/DashboardAPI";
import { toast } from "react-toastify";

const Handlers = () => {
  const dispatch = useDispatch();
  const { isLoading, isGroupVisible, dashboardData, showDashboard } =
    useSelector((state) => state.app);

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
      const data = await DashboardData();
      console.log(`Dash Data: ${JSON.stringify(data, null, 2)}`);

      if (data?.detail === "Not authenticated") {
        toast.error("Not authenticated");
        dispatch(setDashboardData(null));
        dispatch(setShowDashboard(false));
        return;
      }
      dispatch(setDashboardData(data));
      dispatch(setShowDashboard(true));
      toast.success("Dashboard data fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      dispatch(setDashboardData(null));
      dispatch(setShowDashboard(false));
    } finally {
      dispatch(setLoading(false));
    }
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
  };
};

export default Handlers;
