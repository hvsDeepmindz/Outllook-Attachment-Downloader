import axios from "axios";

export const AttachmentTableData = async (
  file,
  duplicate,
  currentPage,
  itemsPerPage
) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/attachment/table-data?target_file=${file}&duplicate=${duplicate}&current_page=${currentPage}&item_per_page=${itemsPerPage}`,
      {
        headers: {
          accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response?.data || [];
  } catch (error) {
    console.error("AttachmentTableData API error:", error);
    return [];
  }
};

export const DownloadAttachments = async (attachmentId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_BASE_URL}/attachment/download`,
    {
      params: { attachment_id: attachmentId },
      responseType: "blob",
      withCredentials: true,
    }
  );

  return response.data;
};

export const DownloadAllAttachments = async (filename) => {
  const config = {
    method: "get",
    url: `${
      import.meta.env.VITE_REACT_APP_BASE_URL
    }/attachment/download-all?target_file=${filename}`,
    headers: {
      Accept: "application/zip",
    },
    responseType: "blob",
    withCredentials: true,
  };

  try {
    const response = await axios.request(config);
    return new Blob([response.data], { type: "application/zip" });
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};

export const BulkUpload = async () => {};
