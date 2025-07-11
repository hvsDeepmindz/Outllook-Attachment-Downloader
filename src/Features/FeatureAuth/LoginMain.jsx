/* eslint-disable no-unused-vars */
import React from "react";
import AuthBtn from "../../Components/Btns/AuthBtn";
import Handlers from "../../Services/Toolkit/Handlers";

const LoginMain = () => {
  const { handleLogin } = Handlers();

  return (
    <div className={`w-full object-cover relative`}>
      <div
        className={`grid grid-cols-2 w-full justify-center max-lg:grid-cols-1`}
      >
        <div
          className={`flex justify-center items-center w-auto h-screen max-lg:h-[600px]`}
        >
          <img
            src={`${import.meta.env.BASE_URL}/Media/login.png`}
            alt="login"
            className={`w-full h-full object-cover`}
          />
        </div>
        <div
          className={`flex flex-col gap-[2rem] justify-center h-full items-center text-center px-[20rem] py-[2rem] max-xl:px-[10rem] max-lg:py-[10rem] max-sm:px-[5rem]`}
        >
          <div className={`flex gap-[1rem]`}>
            <img
              src={`${import.meta.env.BASE_URL}/Media/outlook.png`}
              alt="outlook"
              className="w-[40px] h-[40px] object-cover"
            />
            <h1 className={`text-[2.5rem] font-normal text-[#424242]`}>
              Outlook Attachment Downloader
            </h1>
          </div>
          <div
            onClick={handleLogin}
            className={`flex justify-center items-center w-full mt-[2rem] cursor-pointer`}
          >
            <AuthBtn
              btnTitle={`Sign in with Microsoft`}
              btnImg={`${import.meta.env.BASE_URL}/Media/microsoft.png`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
