/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AttachmentData } from "../../Services/Data/AttachmentData";
import Handlers from "../../Services/Toolkit/Handlers";
import { LuLoaderCircle } from "react-icons/lu";
import ActionBtn from "../Btns/ActionBtn";
import ViewBtn from "../Btns/ViewBtn";

const SearchFilter = ({
  pageTitle,
  filterView,
  searchText,
  attachmentView,
  onSearchChange,
  onSearchSubmit,
  selectedAttachment,
  handleAttachmentSelect,
  searchView,
  attachmentTitle,
  downloadAll,
  showUpload,
}) => {
  const { popHistory, isDownloadingLoad, selectedAttachmentIds } = Handlers();

  return (
    <>
      <div
        className={`pt-[4rem] pb-[3rem] px-[10rem] max-xl:px-[5rem] max-md:px-[2rem] relative w-auto flex flex-col max-xl:gap-[2rem]`}
      >
        <div className={`flex items-center gap-[1rem] justify-start`}>
          <div
            onClick={popHistory}
            className="w-auto flex gap-[1rem] cursor-pointer"
          >
            <img
              src={`${import.meta.env.BASE_URL}/Media/leftarrow.png`}
              alt="leftarrow"
              className="w-full h-full"
            />
            <p className="text-[1.8rem] font-medium text-[#4D4D4D]">Back</p>
          </div>

          <div className={`w-[1px] h-[2rem] bg-[grey]`}></div>
          <Link
            to={"/dashboard"}
            className={`text-[1.8rem] font-normal text-[grey]`}
          >
            Home
          </Link>
          <p className={`text-[1.8rem] font-normal text-[grey]`}>/</p>
          <p className={`text-[1.8rem] font-normal text-[#4D4D4D]`}>
            {attachmentTitle ? "" : pageTitle}{" "}
            {attachmentTitle ? `${attachmentTitle}` : ""}
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`flex justify-end w-auto items-center gap-[2rem] max-lg:flex-col max-xl:items-end`}
        >
          <div className={`flex justify-end gap-[2rem] max-sm:flex-col max-sm:w-full`}>
            {attachmentView === true && selectedAttachmentIds.length > 0 ? (
              <>
                <div className={`flex items-center gap-[1rem] max-sm:w-full`}>
                  {/* <p className={`text-[#4B4B4B] text-[1.8rem] max-sm:hidden`}>Move to</p> */}
                  <select
                    name="attachments"
                    value={selectedAttachment}
                    onChange={(e) => handleAttachmentSelect(e.target.value)}
                    className={`bg-white border-[#765EA5] border-[1px] outline-none px-[2rem] py-[1rem] rounded-xl cursor-pointer font-normal text-[1.8rem] text-[#4D4D4D] max-sm:w-full`}
                  >
                    <option value="">Move To</option>
                    {AttachmentData.map((ele) => (
                      <option key={ele.id} value={ele.title}>
                        {ele.title}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : null}
            {attachmentView === true &&
            selectedAttachmentIds.length > 0 &&
            showUpload ? (
              <div className={`w-auto flex justify-end`}>
                <ViewBtn
                  btnTitle={`Upload`}
                  btnView={"table"}
                  btnIcon={<i className={`fa-solid fa-upload`} />}
                />
              </div>
            ) : null}
            {attachmentView === true ? (
              <div className={`w-auto`}>
                <ViewBtn
                  btnTitle={
                    isDownloadingLoad ? (
                      <LuLoaderCircle size={20} className={`animate-spin`} />
                    ) : (
                      "Download All"
                    )
                  }
                  btnIcon={
                    isDownloadingLoad ? null : (
                      <i className={`fa-solid fa-download`} />
                    )
                  }
                  btnDisable={isDownloadingLoad}
                  btnView={"table"}
                  btnFunc={() => {
                    downloadAll();
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className={`flex items-center gap-[2rem] justify-end max-xl:w-full`}>
            {attachmentView === true ? (
              <div
                className={`flex items-center gap-[1rem] px-[2rem] py-[1rem] border-[1px] border-[#d2d2d2] rounded-xl bg-transparent w-[330px] max-xl:w-full`}
              >
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearchSubmit();
                    }
                  }}
                  className="text-[#939393] placeholder:text-[#939393] font-normal text-[1.8rem] w-full outline-none border-none bg-transparent"
                  placeholder="Search by Email"
                />

                <img
                  src={`${import.meta.env.BASE_URL}/Media/search.png`}
                  alt="search"
                  className="w-[20px] h-[20px]"
                />
              </div>
            ) : searchView === true ? (
              <div
                className={`flex items-center gap-[1rem] px-[2rem] py-[1rem] border-[1px] border-[#d2d2d2] rounded-xl bg-transparent w-[330px] max-xl:w-f`}
              >
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSearchSubmit();
                    }
                  }}
                  className="text-[#939393] placeholder:text-[#939393] font-normal text-[1.8rem] w-full outline-none border-none bg-transparent"
                  placeholder="Search by Name, Email, and Date"
                />

                <img
                  src={`${import.meta.env.BASE_URL}/Media/search.png`}
                  alt="search"
                  className="w-[20px] h-[20px]"
                />
              </div>
            ) : null}
            {filterView === true ? (
              <div
                className={`bg-white px-[1rem] py-[1rem] rounded-lg hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out border-[1px] border-[#765EA5] cursor-pointer`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/Media/filter.png`}
                  alt="filter"
                  className="w-[24px] h-[24px]"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
