import React, { useEffect } from "react";
import Handlers from "../../Services/Toolkit/Handlers";

const Table = ({ tableTitle, columns, data }) => {
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
  } = Handlers();

  useEffect(() => {
    updateTableData(data);
  }, [data]);

  const perPageOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];

  return (
    <div
      title={tableTitle}
      className="px-[10rem] pb-[1rem] relative object-cover w-full rounded-xl"
    >
      <div className="overflow-x-auto no-scrollbar shadow-md rounded-xl">
        <div className="max-h-[605px] overflow-y-auto no-scrollbar">
          <table className="w-full border-collapse rounded-xl shadow-md whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-[#765EA5] text-white">
              <tr>
                <th className="sticky left-0 z-10 bg-[#765EA5] text-white px-[2rem] py-[1.5rem] text-left text-[1.6rem] font-semibold">
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
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-[#E4E2F2]" : "bg-white"
                    } border-t border-[#e5e5e5] hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out cursor-grab`}
                  >
                    <td
                      className={`sticky left-0 ${
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
                          className="px-[2rem] py-[1.5rem] text-[1.6rem] font-medium text-[#333333]"
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
                    colSpan={columns.length + 1}
                    className="px-[2rem] py-[1.5rem] text-center text-[1.6rem] text-[#666666]"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-[2rem] items-center py-[1rem] mt-[1rem]">
        <div className="item-per-page flex items-center gap-[0.8rem]">
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
        </div>
        <span className="text-[1.6rem] text-black font-normal">
          {startIndex + 1} - {Math.min(endIndex, totalItems)}{" "}
          <span className="text-[grey]">Out of {totalItems}</span>
        </span>
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
