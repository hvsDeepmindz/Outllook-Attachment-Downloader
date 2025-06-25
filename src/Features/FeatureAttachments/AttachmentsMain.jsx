import React from "react";
import { AttachmentData } from "../../Services/Data/AttachmentData";

const AttachmentsMain = () => {
  return (
    <>
      <div className={`py-[10rem] px-[10rem] relative object-cover w-full`}>
        <div
          className={`grid grid-cols-4 gap-[6rem] w-full relative justify-center`}
        >
          {AttachmentData.map((ele) => {
            return (
              <div
                key={ele?.id}
                className={`px-[2rem] py-[2rem] bg-white transition-all duration-[0.4s] ease-in-out hover:opacity-[0.8] cursor-pointer rounded-xl flex items-center gap-[2rem] shadow-sm hover:translate-y-[-0.5rem]`}
              >
                <div
                  className={`w-auto h-auto bg-[#F1EFF8] px-[1rem] py-[1rem] rounded-xl`}
                >
                  <img
                    src={ele?.icon}
                    alt="icon"
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className={`text-[#4D4D4D] text-[2rem] font-semibold`}>
                  {ele?.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AttachmentsMain;
