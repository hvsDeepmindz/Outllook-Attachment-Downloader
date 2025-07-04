import { Tooltip } from "antd";
import React from "react";
import Handlers from "../../Services/Toolkit/Handlers";

const DashboardAttachments = () => {
  const { dashboardData } = Handlers();
  const attachmentData = dashboardData?.attachment_data || {
    total_candidates: 0,
    duplicate_candidates: 0,
    total_jd: 0,
    duplicate_jd: 0,
    common_files: 0,
  };
  const duplicateJdPercentage = attachmentData.total_jd
    ? Math.round((attachmentData.duplicate_jd / attachmentData.total_jd) * 100)
    : 0;

  return (
    <div className="bg-white relative object-cover px-[3rem] py-[3rem] rounded-xl flex flex-col gap-[1rem] shadow-md transition-all duration-[0.4s] ease-in-out hover:translate-y-[-1rem] cursor-pointer">
      <div className="flex justify-between items-center gap-[2rem] w-full">
        <div className="flex items-center gap-[2rem]">
          <div className="bg-[#EAEFF5] cursor-pointer rounded-xl px-[1rem] py-[1rem] w-auto h-auto">
            <img
              src={`${import.meta.env.BASE_URL}/Media/clip.png`}
              alt="attachment"
              className="w-[24px] h-[24px] object-cover"
            />
          </div>
          <h2 className="text-[2.2rem] font-semibold text-[#4D4D4D]">
            Total Attachments
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

      <div className="flex justify-between w-full items-center px-[0rem]">
        <div className="w-auto h-auto relative">
          <img
            src={`${import.meta.env.BASE_URL}/Media/chart.png`}
            alt="chart"
            className="w-full h-full"
          />
          <div className="absolute bottom-[7rem] right-0 rounded-xl bg-white shadow-md z-[200] transition-all duration-[0.2s] ease-in-out border-[1px] border-[#f2f2f2]">
            <div className="px-[1rem] py-[0.5rem] bg-[#F5F5F5] rounded-t-xl flex items-center gap-[0.5rem]">
              <div className="rounded-full px-[0.5rem] py-[0.5rem] bg-[#2E125A] mt-[0.5rem]"></div>
              <p className="text-[1.4rem] font-medium text-[#4D4D4D]">
                Duplicate JD
              </p>
            </div>
            <div className="px-[1rem] py-[0.5rem] bg-white rounded-b-xl">
              <p className="text-[1.4rem] font-normal text-[#61758A]">
                {duplicateJdPercentage}%
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[3rem] ml-[4rem]">
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#8A55DD] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Total Candidates
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {attachmentData.total_candidates}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#AA84E6] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Duplicate JD
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {attachmentData.duplicate_jd}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#2E125A] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Total JD
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {attachmentData.total_jd}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#CDB7F1] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Common Files
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {attachmentData.common_files}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-[1rem]">
            <div className="rounded-full px-[0.8rem] py-[0.8rem] bg-[#765EA5] mt-[0.5rem]"></div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-[1.6rem] font-normal text-[#999999]">
                Duplicate Candidates
              </p>
              <p className="text-[1.8rem] font-normal text-[#4D4D4D]">
                {attachmentData.duplicate_candidates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAttachments;
