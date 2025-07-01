/* eslint-disable no-unused-vars */
import React from "react";

const ViewBtn = ({ btnTitle, btnFunc, btnIcon, btnDisable }) => {
  return (
    <>
      <button
        onClick={btnFunc}
        disabled={btnDisable}
        className={`rounded-xl px-[2rem] py-[1rem] bg-[#765EA5] text-white font-normal text-[2rem] w-full hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out ${
          btnDisable ? "cursor-not-allowed" : "cursor-pointer "
        }`}
      >
        {btnIcon}&nbsp; {btnTitle}
      </button>
    </>
  );
};

export default ViewBtn;
  