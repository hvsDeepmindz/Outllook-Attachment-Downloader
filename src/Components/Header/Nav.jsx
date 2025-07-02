/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Handlers from "../../Services/Toolkit/Handlers";

const Nav = () => {
  const {
    isGroupVisible,
    showGroupMenu,
    hideGroupMenu,
    dashboardData,
    getInitials,
    handleLogout,
  } = Handlers();

  return (
    <>
      <div className="py-[2rem] px-[8rem] w-full flex justify-between items-center fixed top-0 left-0 bg-white transition-all duration-[0.2s] ease-in-out shadow-sm max-sm:px-[3rem] z-[200]">
        <Link
          to="/dashboard"
          className="flex justify-start items-center w-auto h-auto"
        >
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}/Media/logo.png`}
            alt="logo"
            className="w-[224px] h-[40px] object-cover"
          />
        </Link>

        <div className="relative cursor-pointer" onMouseEnter={showGroupMenu}>
          <div className="flex justify-end bg-[#624D8A] px-[0.8rem] py-[0.5rem] w-auto rounded-full">
            <p className="text-[2.5rem] text-white">
              {getInitials(dashboardData?.user_name)}
            </p>
          </div>

          <div
            className={`absolute top-full right-[-6rem] mt-[2.5rem] w-auto px-[3rem] py-[2rem] rounded-xl bg-white shadow-lg transition-opacity transition-visibility duration-300 ease-in-out ${
              isGroupVisible ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseLeave={hideGroupMenu}
          >
            <div className="flex flex-col justify-end items-end">
              <button
                onClick={handleLogout}
                type="button"
                className="cursor-pointer text-[1.8rem] font-semibold text-[#4D4D4D] outline-none border-none bg-transparent transition-all duration-300 ease-in-out hover:opacity-[0.5]"
              >
                Log out
              </button>
              <div className="flex items-center justify-start gap-[1rem] mt-[2rem]">
                <div className="bg-[#624D8A] rounded-full px-[1.2rem] py-[1rem]">
                  <p className="text-white text-[2rem] font-normal">
                    {getInitials(dashboardData?.user_name)}
                  </p>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <h2 className="text-[2.5rem] text-[#4D4D4D] font-medium">
                    {dashboardData?.user_name}
                  </h2>
                  <p className="text-[1.8rem] font-normal text-[#666666]">
                    {dashboardData?.user_mail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
