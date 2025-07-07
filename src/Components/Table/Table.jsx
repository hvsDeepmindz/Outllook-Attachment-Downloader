import React, { useEffect } from "react";
import Handlers from "../../Services/Toolkit/Handlers";
import { LuLoader, LuLoaderCircle } from "react-icons/lu";

const Table = ({ tableTitle, columns, data, attachmentView = false }) => {
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    paginatedData,
    handlePageChange,
    updateTableData,
    handleItemsPerPageChange,
    selectedAttachmentIds,
    toggleSelectAllAttachmentRows,
    toggleAttachmentSelect,
    isLoading,
  } = Handlers();

  useEffect(() => {
    updateTableData(data);
  }, [data]);

  const perPageOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div
      title={tableTitle}
      className="px-[10rem] pb-[1rem] relative w-full rounded-xl max-xl:px-[5rem] max-md:px-[2rem]"
    >
      <div className="overflow-x-auto no-scrollbar rounded-xl">
        <div className="h-[580px] max-md:h-[500px] overflow-y-auto no-scrollbar">
          <table className="w-full border-collapse rounded-xl shadow-md whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-[#765EA5] text-white">
              <tr>
                {attachmentView && (
                  <th className="px-[2rem] py-[1.5rem] text-left text-[1.6rem] font-semibold sticky left-0 z-10 bg-[#765EA5]">
                    <input
                      type="checkbox"
                      checked={
                        selectedAttachmentIds.length ===
                          (Array.isArray(data) ? data : data?.table_data || [])
                            .length &&
                        (Array.isArray(data) ? data : data?.table_data || [])
                          .length > 0
                      }
                      onChange={() =>
                        toggleSelectAllAttachmentRows(
                          Array.isArray(data) ? data : data?.table_data || []
                        )
                      }
                      className="cursor-pointer"
                    />
                  </th>
                )}

                <th
                  className={`${
                    attachmentView === true ? "left-[5rem]" : "left-0"
                  } sticky z-10 bg-[#765EA5] text-white px-[2rem] py-[1.5rem] text-left text-[1.6rem] font-semibold`}
                >
                  S. No.
                </th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-[2rem] py-[1.5rem] text-left text-[1.6rem] font-semibold"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td
                    colSpan={columns.length + (attachmentView ? 2 : 1)}
                    className="py-[4rem] px-[4rem] text-center"
                  >
                    <LuLoaderCircle
                      size={30}
                      className="animate-spin text-[#765EA5] mx-auto"
                    />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        rowIndex % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                      } border-t border-[#e5e5e5] hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out cursor-grab`}
                    >
                      {attachmentView && (
                        <td
                          className={`sticky left-0 ${
                            rowIndex % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                          } px-[2rem] py-[1.5rem] text-[1.6rem] font-medium text-[#333333]`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedAttachmentIds.includes(row.id)}
                            onChange={() => toggleAttachmentSelect(row.id)}
                            className="cursor-pointer"
                          />
                        </td>
                      )}
                      <td
                        className={`${
                          attachmentView === true ? "left-[5rem]" : "left-0"
                        } sticky ${
                          rowIndex % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                        } px-[2rem] py-[1.5rem] text-[1.6rem] font-medium text-[#333333]`}
                      >
                        {startIndex + rowIndex + 1}.
                      </td>
                      {columns.map((column, colIndex) => {
                        const accessorOutput = column.accessor(row);
                        const isElement = React.isValidElement(accessorOutput);

                        return (
                          <td
                            key={colIndex}
                            className="px-[2rem] py-[1rem] text-[1.6rem] font-medium text-[#333333]"
                          >
                            {isElement ? (
                              accessorOutput
                            ) : typeof accessorOutput === "string" &&
                              column.header === "Attachment" ? (
                              <a
                                href={accessorOutput}
                                className="text-blue-600 underline ml-2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {accessorOutput.split("/").pop()}
                              </a>
                            ) : (
                              accessorOutput
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (attachmentView ? 2 : 1)}
                      className="px-[2rem] py-[1.5rem] text-center text-[1.6rem] text-[#666666]"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div className="flex justify-end max-md:flex-col gap-[2rem] items-center py-[1rem] mt-[2rem]">
        <div className="item-per-page flex items-center gap-[1rem]">
          <label className="text-[1.6rem] text-[#444444]">Rows:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="border border-[#cccccc] px-[1rem] py-[0.5rem] rounded-md text-[1.4rem] text-[#333333] outline-none cursor-pointer"
          >
            {perPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="text-[1.6rem] text-black font-normal">
            {startIndex + 1} - {Math.min(endIndex, totalItems)}{" "}
            <span className="text-[grey]">Out of {totalItems}</span>
          </span>
        </div>
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-[1rem] py-[0.5rem] text-[1.4rem] ${
              currentPage === 1
                ? "cursor-not-allowed text-[#a3a0a0]"
                : "cursor-pointer text-[#623AA2]"
            } bg-white border-[#d2d2d2] rounded-full mr-[0.5rem]`}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div className="overflow-x-auto flex no-scrollbar grow-0 shrink-0 max-w-[200px] mr-[1rem]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-[1.2rem] py-[0.5rem] text-[1.4rem] border-[1px] ${
                  currentPage === page
                    ? "bg-[#6B46C1] text-white border-transparent"
                    : "text-[#666666] bg-white border-[#d2d2d2]"
                } mx-[0.5rem] rounded-full cursor-pointer`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-[1rem] py-[0.5rem] text-[1.4rem] ${
              currentPage === totalPages
                ? "cursor-not-allowed text-[#a3a0a0]"
                : "cursor-pointer text-[#623AA2]"
            } bg-white border-[#d2d2d2] rounded-full mr-[0.5rem]`}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
