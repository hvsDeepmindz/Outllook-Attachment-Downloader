/* eslint-disable no-unused-vars */
import React from "react";

const AuthBtn = ({ btnImg, btnTitle, btnFunc }) => {
  return (
    <>
      <button
        onClick={btnFunc}
        className={`px-[4rem] py-[2rem] rounded-md w-full cursor-pointer transition-all duration-[0.2s] ease-in-out 
        hover:opacity-[0.8] flex items-center justify-center gap-[1rem] border-[1px] border-[#8C8C8C]`}
      >
        <img src={btnImg} alt="btnImg" className="w-[20px] h-[20px] object-cover" />
        <p className={`text-[1.8rem] font-normal text-[#5E5E5E]`}>{btnTitle}</p>
      </button>
    </>
  );
};

export default AuthBtn;
