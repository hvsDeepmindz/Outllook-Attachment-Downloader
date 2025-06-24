/* eslint-disable no-unused-vars */
import React from "react";

const ViewBtn = ({ btnTitle, btnFunc, btnIcon }) => {
  return (
    <>
      <button
        onClick={btnFunc}
        className={`rounded-xl px-[2rem] py-[1rem] bg-[#765EA5] text-white font-normal text-[2rem] w-full cursor-pointer 
        hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out`}
      >
        {btnIcon}&nbsp; {btnTitle}
      </button>
    </>
  );
};

export default ViewBtn;
