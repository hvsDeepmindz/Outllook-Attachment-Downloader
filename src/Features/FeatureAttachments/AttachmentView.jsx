import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../Components/Header/Nav";
import SearchFilter from "../../Components/Card/SearchFilter";
import Table from "../../Components/Table/Table";
import { AttachmentData } from "../../Services/Data/AttachmentData";
import { AttachmentTableData } from "../../Services/APIs/AttachmentAPI";
import axios from "axios";

const AttachmentView = () => {
  const { title: value } = useParams();
  const [tableData, setTableData] = useState([]);

  const matchedItem = useMemo(() => {
    return AttachmentData.find(
      (item) => item.value === decodeURIComponent(value)
    );
  }, [value]);

  const matchedTitle = matchedItem?.title || "Attachments";

  useEffect(() => {
    if (value) {
      const fetchData = async () => {
        const res = await AttachmentTableData(decodeURIComponent(value));
        setTableData(res || []);
      };
      fetchData();
    }
  }, [value]);

  const handleDownload = async (attachmentId, attachmentName) => {
    try {
      const response = await axios.get(
        `https://buddy.pharynxai.in/api-attachment-downloader-v2/attachment/download`,
        {
          params: { attachment_id: attachmentId },
          responseType: "blob",
          headers: {},
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = attachmentName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "Download failed: " + (error.response?.statusText || error.message)
      );
    }
  };

  const columns = [
    {
      header: "Sender Email",
      accessor: (row) => row.sender_mail,
    },
    {
      header: "Attachment",
      accessor: (row) => (
        <button
          className={`flex items-center justify-start bg-[#f1f1f1] border-[1px] border-[#f2f2f2] px-[2rem] py-[0.5rem] rounded-full`}
        >
          <img
            src={`${import.meta.env.BASE_URL}/Media/doc.png`}
            loading="lazy"
            className={`w-[16px] h-[16px]`}
          />
          &nbsp; {row.attachment_name}
          <p className="text-blue-600"></p>
        </button>
      ),
    },
    {
      header: "Download",
      accessor: (row) =>
        row.attachment_name ? (
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}/Media/download.png`}
              loading="lazy"
              onClick={() => handleDownload(row.id, row.attachment_name)}
              className="fa-solid fa-download text-[1.8rem] text-[grey] cursor-pointer bg-[white] border-[1px] border-[#d2d2d2] w-[30px] h-[30px] px-[0.3rem] py-[0.3rem] rounded-md"
            />
            <img
              src={`${import.meta.env.BASE_URL}/Media/upload.png`}
              loading="lazy"
              className="fa-solid fa-upload text-[1.8rem] text-[grey] cursor-pointer bg-[white] border-[1px] 
              border-[#d2d2d2] w-[30px] h-[30px] px-[0.3rem] py-[0.3rem] rounded-md"
            />
          </div>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <>
      <Nav />
      <div className="relative object-cover w-full h-full mt-[9rem] bg-[#f2f2f2]">
        <SearchFilter
          pageTitle="Attachments"
          filterView={false}
          attachmentView={false}
        />
        <Table
          tableTitle={`${matchedTitle} Table`}
          columns={columns}
          data={tableData}
        />
      </div>
    </>
  );
};

export default AttachmentView;
