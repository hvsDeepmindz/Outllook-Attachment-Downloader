/* eslint-disable no-unused-vars */
import React from "react";

const ActionBtn = ({ btnTitle, btnFunc, btnIcon }) => {
  return (
    <>
      <button
        onClick={btnFunc}
        className={`rounded-xl px-[2rem] py-[1rem] bg-[#F1EFF8] text-[#514171] font-normal text-[1.8rem] w-full cursor-pointer 
        hover:opacity-[0.8] transition-all duration-[0.2s] ease-in-out`}
      >
        {btnIcon}&nbsp; {btnTitle}
      </button>
    </>
  );
};

export default ActionBtn;
