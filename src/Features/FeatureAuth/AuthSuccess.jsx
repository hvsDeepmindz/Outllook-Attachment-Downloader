import React from "react";
import ViewBtn from "../../Components/Btns/ViewBtn";

const AuthSuccess = () => {
  return (
    <>
      <div
        className={`py-[6rem] px-[10rem] relative object-cover w-full h-screen bg-[#f2f2f2]`}
      >
        <div
          className={`flex flex-col gap-[1rem] w-full justify-center items-center text-center h-full`}
        >
          <div className={`w-auto h-auto`}>
            <img
              src="/Media/success.png"
              alt="success"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className={`text-[3.2rem] font-bold text-[#4D4D4D] mt-[2rem]`}>
            Authentication Successful
          </h1>
          <p className="text-[2rem] font-normal text-[#666666]">
            Your account has been securely authenticated and is now ready for
            use.
          </p>
          <div className={`w-auto flex justify-center items-center mt-[4rem]`}>
            <ViewBtn btnTitle={"Continue"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthSuccess;
