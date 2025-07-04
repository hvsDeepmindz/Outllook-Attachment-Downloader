/* eslint-disable no-unused-vars */
import React from "react";

const LinkBtn = ({ btnTitle, btnFunc, btnIcon }) => {
  return (
    <>
      <div
        onClick={btnFunc}
        className={`rounded-xl px-[2rem] py-[1rem] bg-[#CFCAE8] text-[#514171] font-normal text-[1.8rem] w-full cursor-pointer 
        hover:opacity-[0.8] border-[1px] border-transparent transition-all duration-[0.2s] ease-in-out flex items-center 
        gap-[1rem]`}
      >
        <div className={``}>{btnIcon}</div> 
        <button className={``}>{btnTitle}</button>
      </div>
    </>
  );
};

export default LinkBtn;
