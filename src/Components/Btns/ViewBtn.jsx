/* eslint-disable no-unused-vars */
import React from "react";

const ViewBtn = ({ btnTitle, btnFunc, btnIcon, btnDisable, btnView }) => {
  return (
    <>
      <button
        onClick={btnFunc}
        disabled={btnDisable}
        className={`rounded-xl flex items-center px-[2rem] py-[1rem] border-[1px] ${
          btnView === "table"
            ? "bg-white border-[#765EA5] text-[#765EA5]"
            : "bg-[#765EA5] border-transparent text-white"
        } font-normal text-[2rem] w-full hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out ${
          btnDisable ? "cursor-not-allowed" : "cursor-pointer "
        }`}
      >
        {btnIcon}&nbsp; {btnTitle}
      </button>
    </>
  );
};

export default ViewBtn;
