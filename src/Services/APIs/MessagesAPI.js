import axios from "axios";

export const MessageData = async (currentPage, itemPerPage) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://buddy.pharynxai.in/api-attachment-downloader-v2/message/get-messages?current_page=${currentPage}&item_per_page=${itemPerPage}`,
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
