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
  pushToHistoryStack,
  popFromHistoryStack,
  setSelectedAttachment,
  setAttachmentTableData,
  setDownloadingAttachmentId,
  toggleSelectAttachment,
  toggleSelectAllAttachments,
  resetSelectedAttachments,
  setIsDownloadingLoad,
} from "./Slice";
import { useEffect } from "react";
import { userLogin, userLogout } from "../../../config";
import { DashboardData } from "../APIs/DashboardAPI";
import { toast } from "react-toastify";
import { MessageData } from "../APIs/MessagesAPI";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SyncData, SyncStatus } from "../APIs/SyncAPI";
import { SearchMessage } from "../APIs/SearchMessageAPI";
import {
  AttachmentTableData,
  DownloadAllAttachments,
  DownloadAttachments,
} from "../APIs/AttachmentAPI";

const Handlers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title: routeParamTitle } = useParams();
  const location = useLocation();

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
    selectedAttachment,
    attachmentTableData,
    historyStack,
    downloadingAttachmentId,
    selectedAttachmentIds,
    selectAllAttachments,
    isDownloadingLoad,
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
          pushHistory("/login");
        }, 3000);
        return;
      }
      if (status !== 200) {
        dispatch(setDashboardData(null));
        dispatch(setShowDashboard(false));
        setTimeout(() => {
          pushHistory("/login");
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
        pushHistory("/login");
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
      setTimeout(() => pushHistory("/login"), 2000);
    }
    dispatch(setLoading(false));
  };

  const fetchSyncData = async () => {
    dispatch(setLoading(true));
    try {
      const initial = await SyncStatus();
      const total = initial?.total_items || 0;
      const synced = initial?.total_synced_items || 0;
      const pending = Math.max(total - synced, 0);
      dispatch(setSyncPendingItems(pending));
      await new Promise((resolve) => setTimeout(resolve, 100));

      const result = await SyncData();
      const newSynced = result?.total_synced_items || 0;
      const newPending = total - newSynced;

      dispatch(setSyncPendingItems(newPending));

      if (newSynced > synced) {
        toast.success(`Synced ${newSynced - synced} items successfully`);
      } else {
        toast.info("Already up to date");
      }
      fetchDashboardData();
    } catch {
      toast.error("Sync failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchAttachmentData = async (value) => {
    dispatch(setLoading(true));
    try {
      const res = await AttachmentTableData(decodeURIComponent(value));
      if (res) {
        dispatch(updateAttachmentTableData(res));
        dispatch(setShowDashboard(true));
      } else {
        dispatch(setShowDashboard(false));
        toast.error("Not Authorized");
        setTimeout(() => {
          pushHistory("/login");
        }, 1000);
      }
    } catch (error) {
      dispatch(setShowDashboard(false));
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // End fetch API func

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

  const handlePageChange = async (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      dispatch(setLoading(true));

      if (searchText.trim() !== "") {
        const res = await SearchMessage({
          text: searchText,
          currentPage: page,
          itemsPerPage,
        });
        if (res?.table_data) {
          dispatch(setMessageTableData(res));
        }
      } else {
        await fetchMessageData(page, itemsPerPage);
      }

      dispatch(setLoading(false));
    }
  };

  const handleItemsPerPageChange = async (value) => {
    dispatch(setItemsPerPage(value));
    dispatch(setCurrentPage(1));
    dispatch(setLoading(true));

    if (searchText.trim() !== "") {
      const res = await SearchMessage({
        text: searchText,
        currentPage: 1,
        itemsPerPage: value,
      });
      if (res?.table_data) {
        dispatch(setMessageTableData(res));
      }
    } else {
      await fetchMessageData(1, value);
    }

    dispatch(setLoading(false));
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

  const pushHistory = (path) => {
    const currentPath = location.pathname;
    if (historyStack[historyStack.length - 1] !== currentPath) {
      dispatch(pushToHistoryStack(currentPath));
    }
    navigate(path);
  };

  const popHistory = () => {
    dispatch(popFromHistoryStack());
    const prevPath = historyStack[historyStack.length - 1] || "/dashboard";
    navigate(prevPath);
  };

  const handleAttachmentClick = (item) => {
    dispatch(setSelectedAttachment(item));
    pushHistory(`/attachments/${item.value}`);
  };

  const handleDownloadAttachments = async (attachmentId, attachmentName) => {
    try {
      dispatch(setDownloadingAttachmentId(attachmentId));
      const blobData = await DownloadAttachments(attachmentId);
      if (!blobData || !(blobData instanceof Blob)) {
        toast.error("Invalid file response");
        return;
      }

      const url = window.URL.createObjectURL(blobData);
      const a = document.createElement("a");
      a.href = url;
      a.download = attachmentName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download complete");
    } catch (error) {
      toast.error("Download failed");
    } finally {
      dispatch(setDownloadingAttachmentId(null));
    }
  };

  const handleDownloadAllAttachments = async (filename) => {
    try {
      dispatch(setIsDownloadingLoad(true));
      const blob = await DownloadAllAttachments(filename);
      if (!blob || !(blob instanceof Blob)) {
        toast.error("Invalid file response");
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download complete");
    } catch (error) {
      toast.error("Download failed");
      dispatch(setIsDownloadingLoad(false));
    } finally {
      dispatch(setIsDownloadingLoad(false));
    }
  };

  const updateAttachmentTableData = (data) => {
    dispatch(setAttachmentTableData(data));
  };

  const toggleAttachmentSelect = (id) => {
    dispatch(toggleSelectAttachment(id));
  };

  const toggleSelectAllAttachmentRows = (rows) => {
    const allIds = rows.map((r) => r.id);
    dispatch(toggleSelectAllAttachments(allIds));
  };

  useEffect(() => {
    dispatch(resetSelectedAttachments());
  }, [attachmentTableData]);

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
    selectedAttachment,
    attachmentTableData,
    handleAttachmentClick,
    handleDownloadAttachments,
    handleDownloadAllAttachments,
    updateAttachmentTableData,
    historyStack,
    pushHistory,
    popHistory,
    downloadingAttachmentId,
    toggleAttachmentSelect,
    toggleSelectAllAttachmentRows,
    selectedAttachmentIds,
    selectAllAttachments,
    isDownloadingLoad,
    // Api func
    fetchDashboardData,
    fetchMessageData,
    fetchSyncData,
    fetchAttachmentData,
  };
};

export default Handlers;
