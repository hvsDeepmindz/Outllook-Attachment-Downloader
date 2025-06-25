/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setIsGroupVisible } from "./Slice";
import { useEffect } from "react";
import { userLogin } from "../../../config";

const Handlers = () => {
  const dispatch = useDispatch();
  const { isLoading, isGroupVisible } = useSelector((state) => state.app);

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

  return {
    isLoading,
    handleLoad,
    handleLogin,
    isGroupVisible,
    showGroupMenu,
    hideGroupMenu,
  };
};

export default Handlers;
