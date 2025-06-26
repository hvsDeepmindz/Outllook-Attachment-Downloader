/* eslint-disable no-unused-vars */
import React from "react";
import ProgressDesign from "../../Components/Design/ProgressDesign";
import Handlers from "../../Services/Toolkit/Handlers";

const DashboardDownloads = () => {
  const { dashboardData, fetchDashboardData } = Handlers();
  const downloadData = dashboardData?.download_data || {
    total: 0,
    success: 0,
    pending: 0,
  };

  return (
    <div className="bg-white relative object-cover px-[3rem] py-[3rem] rounded-xl flex flex-col gap-[3rem] shadow-md transition-all duration-[0.4s] ease-in-out hover:translate-y-[-1rem] cursor-pointer">
      <div className="flex justify-between items-center gap-[2rem] w-full">
        <div className="flex items-center gap-[2rem]">
          <div className="bg-[#EAEFF5] cursor-pointer rounded-xl px-[1rem] py-[1rem] w-auto h-auto">
            <img
              src="/Media/download.png"
              alt="download"
              className="w-[24px] h-[24px] object-cover"
            />
          </div>
          <h2 className="text-[2.2rem] font-semibold text-[#4D4D4D]">
            Total Downloads
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
          progressTitle="Downloads"
          progressPercent={downloadData.pending}
          progressPercentDone={downloadData.success}
          progressPercentFailed={0}
          progressColor="#FAAD14"
          progressDoneColor="#52C41A"
          progressFailedColor="#F5222D"
          progressSize={200}
          progressWidth="15"
        />
        <div className="flex flex-col gap-[3rem] mr-[10rem]">
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#52C41A] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Success
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {downloadData.success}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#FAAD14] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Pending
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {downloadData.pending}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDownloads;
