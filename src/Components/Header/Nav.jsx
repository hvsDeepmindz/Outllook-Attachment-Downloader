import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div
        className={`py-[2rem] px-[8rem] w-full flex justify-between items-center fixed top-0 left-0 bg-white transition-all duration-[0.2s] ease-in-out shadow-sm max-sm:px-[3rem]`}
      >
        <Link
          to={"/dashboard"}
          className={`flex justify-start items-center w-auto h-auto`}
        >
          <img
            loading="lazy"
            src="/Media/logo.png"
            alt="logo"
            className={`w-[224px] h-[40px] object-cover`}
          />
        </Link>
        <div
          className={`flex justify-end bg-[#624D8A] px-[0.8rem] py-[0.5rem] w-auto rounded-full`}
        >
          <p className={`text-[2.5rem] text-white`}>BR</p>
        </div>
      </div>
    </>
  );
};

export default Nav;
