import { Tooltip } from "antd";
import React from "react";
import ProgressDesign from "../../Components/Design/ProgressDesign";
import Handlers from "../../Services/Toolkit/Handlers";

const DashboardMail = () => {
  const { dashboardData } = Handlers();
  const mailData = dashboardData?.mail_data || {
    total: 0,
    with_attachments: 0,
    without_attachments: 0,
  };

  return (
    <div className="bg-white relative object-cover px-[3rem] py-[3rem] rounded-xl flex flex-col gap-[3rem] shadow-md transition-all duration-[0.4s] ease-in-out hover:translate-y-[-1rem] cursor-pointer">
      <div className="flex justify-between items-center gap-[2rem] w-full">
        <div className="flex items-center gap-[2rem]">
          <div className="bg-[#EAEFF5] cursor-pointer rounded-xl px-[1rem] py-[1rem] w-auto h-auto">
            <img
              src="/Media/mail.png"
              alt="mail"
              className="w-[24px] h-[24px] object-cover"
            />
          </div>
          <h2 className="text-[2.2rem] font-semibold text-[#4D4D4D]">
            Total Mail
          </h2>
        </div>
        <div className="flex justify-end w-auto">
          <select
            name="date"
            id="date"
            className="px-[2rem] py-[1rem] outline-none border-[1px] border-[#d2d2d2] text-[#4D4D4D] font-normal text-[1.8rem] rounded-xl cursor-pointer"
          >
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between w-full items-start px-[2rem]">
        <ProgressDesign
          progressTitle="Mail"
          progressPercentDone={mailData?.with_attachments}
          progressPercent={mailData?.without_attachments}
          progressTotal={mailData?.total}
          progressColor="#A6B7D3"
          progressDoneColor="#6B76A0"
          progressFailedColor="#F5222D"
          progressSize={200}
          progressWidth="15"
        />
        <div className="flex flex-col gap-[3rem] mr-[1rem]">
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#6B76A0] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                With Attachments
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {mailData?.with_attachments}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#A6B7D3] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Without Attachments
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {mailData?.without_attachments}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMail;
