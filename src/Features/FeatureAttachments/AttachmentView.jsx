/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import Nav from "../../Components/Header/Nav";
import SearchFilter from "../../Components/Card/SearchFilter";
import Table from "../../Components/Table/Table";
import Handlers from "../../Services/Toolkit/Handlers";
import { AttachmentData } from "../../Services/Data/AttachmentData";
import { LuLoaderCircle } from "react-icons/lu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIErrorView from "../../Components/Error/APIErrorView";

const AttachmentView = () => {
  const { title: value } = useParams();
  const location = useLocation();
  const isAttachmentPage = location.pathname.includes("/attachments/");

  const {
    showDashboard,
    attachmentTableData,
    fetchAttachmentData,
    handleDownloadAttachments,
    handleDownloadAllAttachments,
    downloadingAttachmentId,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    updateTableData,
    selectedAttachment,
    handleAttachmentClick,
    searchText,
    handleSearchTextChange,
    handleSearchSubmit,
  } = Handlers();

  const finalTitle = selectedAttachment?.title || "Attachments";

  useEffect(() => {
    fetchAttachmentData(decodeURIComponent(value), currentPage, itemsPerPage);
  }, [value, currentPage, itemsPerPage]);

  useEffect(() => {
    updateTableData(attachmentTableData, "attachment");
  }, [attachmentTableData]);

  useEffect(() => {
    const decodedValue = decodeURIComponent(value);
    if (!selectedAttachment || selectedAttachment.value !== decodedValue) {
      const matched = AttachmentData.find(
        (item) => item.value === decodedValue
      );
      if (matched) handleAttachmentClick(matched);
    }
  }, []);

  const columns = [
    {
      header: "Sender Email",
      accessor: (row) => row.sender_mail,
    },
    {
      header: "Attachment",
      accessor: (row, index) => (
        <button
          className={`flex items-center justify-start border-[1px] border-[#f2f2f2] px-[2rem] py-[0.3rem] rounded-full ${
            index % 2 === 0 ? "bg-[#E4E2F2]" : "bg-[#f1f1f1]"
          }`}
        >
          <img
            src={`${import.meta.env.BASE_URL}/Media/doc.png`}
            loading="lazy"
            className="w-[16px] h-[16px]"
          />
          &nbsp; {row.name}
        </button>
      ),
    },
    {
      header: "Download",
      accessor: (row, index) =>
        row.name ? (
          <div className="flex items-center gap-3">
            {downloadingAttachmentId === row.id ? (
              <div
                className={`border-[1px] border-[#d2d2d2] w-[30px] h-[30px] rounded-md flex justify-center items-center ${
                  index % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                }`}
              >
                <LuLoaderCircle className="animate-spin text-[1.8rem] text-[grey]" />
              </div>
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}/Media/download.png`}
                loading="lazy"
                onClick={() => handleDownloadAttachments(row.id, row.name)}
                className={`fa-solid fa-download text-[1.8rem] text-[grey] cursor-pointer border-[1px] border-[#d2d2d2] 
                w-[30px] h-[30px] px-[0.3rem] py-[0.1rem] rounded-md ${
                  index % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                }`}
              />
            )}
          </div>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className={"custom-toast-container"}
      />
      {showDashboard ? (
        <>
          <Nav />
          <div className="relative object-cover w-full h-screen mt-[9rem] bg-[#f2f2f2]">
            <SearchFilter
              pageTitle="Attachments"
              filterView={true}
              attachmentTitle={finalTitle}
              attachmentView={true}
              searchView={false}
              searchText={searchText}
              onSearchChange={handleSearchTextChange}
              onSearchSubmit={handleSearchSubmit}
              downloadAll={() =>
                handleDownloadAllAttachments(decodeURIComponent(value))
              }
              showUpload={decodeURIComponent(value) === "resume"}
            />
            <Table
              tableTitle={`${finalTitle} Table`}
              columns={columns}
              data={attachmentTableData}
              attachmentView={true}
              handlePageChange={(page) =>
                handlePageChange(page, "attachment", value)
              }
              handleItemsPerPageChange={(val) =>
                handleItemsPerPageChange(val, "attachment", value)
              }
            />
          </div>
        </>
      ) : (
        <APIErrorView />
      )}
    </>
  );
};

export default AttachmentView;
