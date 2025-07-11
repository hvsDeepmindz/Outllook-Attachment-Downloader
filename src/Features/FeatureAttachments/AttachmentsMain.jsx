import React from "react";
import Handlers from "../../Services/Toolkit/Handlers";
import { AttachmentData } from "../../Services/Data/AttachmentData";

const AttachmentsMain = () => {
  const { handleAttachmentClick } = Handlers();

  return (
    <div className="pt-[12rem] max-sm:pt-0 px-[10rem] relative object-cover w-full flex justify-center items-center max-xl:px-[5rem] max-md:px-[2rem]">
      <div className="grid grid-cols-4 gap-[6rem] w-full relative justify-center items-center max-lg:grid-cols-3 max-sm:grid-cols-1 max-sm:gap-[4rem] h-full">
        {AttachmentData.map((ele) => (
          <div
            key={ele.id}
            onClick={() => handleAttachmentClick(ele)}
            className="px-[2rem] py-[2rem] bg-white transition-all duration-300 hover:opacity-80 cursor-pointer rounded-xl flex items-center gap-[2rem] shadow-sm hover:translate-y-[-0.5rem]"
          >
            <div className="w-auto h-auto flex items-center justify-center bg-[#F1EFF8] px-[1rem] py-[1rem] rounded-xl">
              <img
                src={ele.icon}
                alt="icon"
                className="w-[40px] h-[40px] object-cover"
              />
            </div>
            <p className="text-[#4D4D4D] text-[2rem] font-semibold">
              {ele.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentsMain;
