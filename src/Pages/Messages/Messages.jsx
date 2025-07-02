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
    dashboardData,
    messageTableData,
    fetchDashboardData,
    fetchMessageData,
    itemsPerPage,
    currentPage,
    showDashboard,
    totalItems,
    totalPages,
    searchText,
    handleSearchTextChange,
    handleSearchSubmit,
  } = Handlers();

  useEffect(() => {
    if (!dashboardData?.user_name || !dashboardData?.user_mail) {
      fetchDashboardData();
    }
    fetchMessageData(currentPage, itemsPerPage);
  }, []);

  const columns = [
    { header: "Name", accessor: (row) => row.sender_name },
    { header: "Email", accessor: (row) => row.sender_mail },
    { header: "Subject", accessor: (row) => row.subject },
    {
      header: "Date",
      accessor: (row) => new Date(row.received_datetime).toLocaleString(),
    },
  ];

  const primaryKeys = ["sender_name", "sender_mail", "subject"];
  const columnsAll =
    messageTableData.length > 0
      ? [
          ...primaryKeys,
          ...Object.keys(messageTableData[0]).filter(
            (key) => !primaryKeys.includes(key)
          ),
        ].map((key) => ({
          header: key
            .replaceAll("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          accessor: (row) => {
            const value = row[key];
            if (key === "sender_name" || key === "subject") {
              const words = value?.split(" ") || [];
              const limit = key === "subject" ? 4 : 8;
              const display =
                words.length > limit
                  ? words.slice(0, limit).join(" ") + "..."
                  : value;
              return (
                <Tooltip title={value}>
                  <span>{display}</span>
                </Tooltip>
              );
            }
            if (key.includes("datetime"))
              return new Date(value).toLocaleDateString();
            if (typeof value === "boolean") return value ? "Yes" : "No";
            return value;
          },
        }))
      : [];

  return (
    <>
      {showDashboard ? (
        <>
          <Nav />
          <div className="relative object-cover w-full h-[90vh] mt-[9rem] bg-[#f2f2f2]">
            <SearchFilter
              pageTitle="Messages"
              filterView={true}
              searchText={searchText}
              attachmentView={false}
              searchView={true}
              onSearchChange={handleSearchTextChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <Table
              tableTitle="Messages Table"
              columns={columns}
              data={{
                table_data: messageTableData,
                meta_data: { total_items: totalItems, total_pages: totalPages },
              }}
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
