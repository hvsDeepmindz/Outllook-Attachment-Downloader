import axios from "axios";

export const AttachmentTableData = async (file) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_REACT_APP_BASE_URL
      }/attachment/table-data?file=${file}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return response?.data || [];
  } catch (error) {
    console.error("AttachmentTableData API error:", error);
    return [];
  }
};
