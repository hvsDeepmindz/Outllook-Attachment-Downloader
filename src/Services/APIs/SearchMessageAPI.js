import axios from "axios";

export const SearchMessage = async ({ text, currentPage, itemsPerPage }) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${
      import.meta.env.VITE_BACKEND_URL
    }/search/message?text=${text}&current_page=${currentPage}&item_per_page=${itemsPerPage}`,
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
