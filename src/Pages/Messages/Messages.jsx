/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import SearchFilter from "../../Components/Card/SearchFilter";
import Nav from "../../Components/Header/Nav";
import Table from "../../Components/Table/Table";
import Handlers from "../../Services/Toolkit/Handlers";
import { Tooltip } from "antd";
import APIErrorView from "../../Components/Error/APIErrorView";

const Messages = () => {
  const {
    messageData,
    fetchMessageData,
    itemsPerPage,
    currentPage,
    showDashboard,
  } = Handlers();

  const columns = [
    { header: "Name", accessor: (row) => row.sender_name },
    { header: "Email", accessor: (row) => row.sender_mail },
    { header: "Subject", accessor: (row) => row.subject },
    {
      header: "Date",
      accessor: (row) => row.received_datetime,
    },
  ];

  useEffect(() => {
    fetchMessageData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const primaryKeys = ["sender_name", "sender_mail", "subject"];
  const columnsAll =
    messageData.length > 0
      ? [
          ...primaryKeys,
          ...Object.keys(messageData[0]).filter(
            (key) => !primaryKeys.includes(key)
          ),
        ].map((key) => ({
          header: key
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          accessor: (row) => {
            const value = row[key];
            if (key === "sender_name") {
              const words = value?.split(" ") || [];
              const display =
                words.length > 6 ? words.slice(0, 8).join(" ") + "..." : value;
              return (
                <Tooltip title={value}>
                  <span>{display}</span>
                </Tooltip>
              );
            }
            if (key === "subject") {
              const words = value?.split(" ") || [];
              const display =
                words.length > 4 ? words.slice(0, 4).join(" ") + "..." : value;
              return (
                <Tooltip title={value}>
                  <span>{display}</span>
                </Tooltip>
              );
            }
            if (key.includes("datetime")) {
              return new Date(value).toLocaleDateString();
            }
            if (typeof value === "boolean") {
              return value ? "Yes" : "No";
            }
            return value;
          },
        }))
      : [];

  return (
    <>
      {showDashboard ? (
        <>
          <Nav />
          <div className="relative object-cover w-full h-full mt-[9rem] bg-[#f2f2f2]">
            <SearchFilter pageTitle="Messages" filterView={true} />
            <Table
              tableTitle="Messages Table"
              columns={columns}
              data={messageData}
            />
          </div>
        </>
      ) : (
        <APIErrorView />
      )}
    </>
  );
};

export default Messages;
