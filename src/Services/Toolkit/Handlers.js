/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setIsAuthenticated } from "./Slice";
import { useEffect } from "react";
import { userLogin } from "../../../config";

const Handlers = () => {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.app);

  const handleLoad = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  };

  const handleLogin = () => {
    window.location.href = userLogin;
  };

  const handleAuthCheck = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get("response");

    if (response) {
      try {
        const successResponse = JSON.parse(decodeURIComponent(response));
        if (successResponse.successful) {
          localStorage.setItem("userId", successResponse.user_id);
          dispatch(setIsAuthenticated(true));
        }
      } catch (error) {
        console.error("Error parsing response:", error);
      }
    }
  };

  useEffect(() => {
    handleAuthCheck();
  }, []);

  return {
    isLoading,
    isAuthenticated,
    handleLoad,
    handleLogin,
    handleAuthCheck,
  };
};

export default Handlers;
