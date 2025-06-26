import React from "react";
import { Link } from "react-router-dom";

const APIErrorView = () => {
  return (
    <>
      <div
        className={`px-[2rem] py-[2rem] w-full h-screen relative object-cover`}
      >
        <div
          className={`flex flex-col gap-[1rem] justify-center items-center text-center h-full`}
        >
          <h2 className={`text-[3rem] font-normal text-[orangered]`}>
            <i className="fa-regular fa-face-frown" />
            &nbsp; Error while fetching data
          </h2>
          <Link
            to={"/login"}
            className="text-[#414141] font-normal text-[2rem]"
          >
            <i className="fa-regular fa-hand-point-left" />
            &nbsp; Back to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default APIErrorView;
