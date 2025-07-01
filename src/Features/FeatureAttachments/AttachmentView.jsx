import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Handlers from "../../Services/Toolkit/Handlers";
import Nav from "../../Components/Header/Nav";
import SearchFilter from "../../Components/Card/SearchFilter";
import Table from "../../Components/Table/Table";
import { AttachmentData } from "../../Services/Data/AttachmentData";

const AttachmentView = () => {
  const { title } = useParams();

  const {
    selectedAttachment,
    handleAttachmentSelect,
    attachmentTableData,
    fetchAttachmentTableData,
  } = Handlers();

  const matchedItem = useMemo(() => {
    return AttachmentData.find(
      (item) => item.title === decodeURIComponent(title)
    );
  }, [title]);

  const matchedValue = matchedItem?.value || "";

  useEffect(() => {
    if (title && title !== selectedAttachment) {
      handleAttachmentSelect(decodeURIComponent(title));
    }
  }, [title]);

  useEffect(() => {
    if (matchedValue) {
      fetchAttachmentTableData(matchedValue);
    }
  }, [matchedValue]);

  const columns = [
    {
      header: "Sender Email",
      accessor: (row) => row.sender_mail,
    },
    {
      header: "Attachment",
      accessor: (row) => (
        <a
          href={`/media/attachments/${row.attachment_name}`}
          className="text-blue-600 underline ml-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.attachment_name}
        </a>
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
          attachmentView={true}
          selectedAttachment={selectedAttachment}
          handleAttachmentSelect={handleAttachmentSelect}
        />
        <Table
          tableTitle={`${matchedItem?.title || "Attachments"} Table`}
          columns={columns}
          data={attachmentTableData}
        />
      </div>
    </>
  );
};

export default AttachmentView;
