import axios from "axios";

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
    .then((response) => {
      //   console.log(JSON.stringify(response.data));
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
};
