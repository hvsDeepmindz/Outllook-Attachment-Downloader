import axios from "axios";

export const SyncData = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/message/sync`,
    headers: {
      accept: "application/json",
    },
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

export const SyncStatus = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/message/sync-status`,
    headers: {
      accept: "application/json",
    },
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
