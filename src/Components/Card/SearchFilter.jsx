import React from "react";
import { Link } from "react-router-dom";

const SearchFilter = ({ pageTitle, filterView }) => {
  return (
    <>
      <div
        className={`pt-[4rem] pb-[3rem] px-[10rem] relative object-cover w-auto flex flex-col`}
      >
        <div className={`flex items-center gap-[1rem] justify-start`}>
          <div className={`w-auto flex gap-[1rem] cursor-pointer`}>
            <img
              src="/Media/leftarrow.png"
              alt="leftarrow"
              className="w-full h-full"
            />
            <p className={`text-[1.8rem] font-medium text-[#4D4D4D]`}>Back</p>
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
            {pageTitle}
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`flex justify-end w-auto items-center gap-[2rem]`}
        >
          <div
            className={`flex items-center gap-[1rem] px-[2rem] py-[1rem] border-[1px] border-[#d2d2d2] rounded-xl bg-transparent w-[330px]`}
          >
            <input
              type="text"
              name="search"
              id="search"
              className={`text-[#939393] placeholder:text-[#939393] font-normal text-[1.8rem] w-full outline-none border-none bg-transparent`}
              placeholder="Search by Name, Email, and Date"
            />
            <img
              src="/Media/search.png"
              alt="search"
              className="w-[20px] h-[20px]"
            />
          </div>
          {filterView === true ? (
            <div
              className={`bg-white px-[1rem] py-[1rem] rounded-lg hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out border-[1px] border-[#765EA5] cursor-pointer`}
            >
              <img
                src="/Media/filter.png"
                alt="filter"
                className="w-[24px] h-[24px]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
