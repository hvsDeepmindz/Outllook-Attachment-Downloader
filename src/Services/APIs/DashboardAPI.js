import axios from "axios";
import { toast } from "react-toastify";

export const DashboardData = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/dash/dash-data`,
    headers: {},
    withCredentials: true,
  };

  return axios
    .request(config)
    .then((response) => ({
      status: response?.status,
      data: response?.data,
    }))
    .catch((error) => {
      if (!error?.response) {
        toast.error("Not authenticated");
        console.log(`Error response is: ${error?.response}`);

        return { status: 500, data: {} };
      }
      return {
        status: error.response.status,
        data: error.response.data || {},
      };
    });
};
