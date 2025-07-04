/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ViewBtn from "../../Components/Btns/ViewBtn";
import LinkBtn from "../../Components/Btns/LinkBtn";
import ActionBtn from "../../Components/Btns/ActionBtn";
import DashboardDownloads from "./DashboardDownloads";
import DashboardUploads from "./DashboardUploads";
import DashboardMail from "./DashboardMail";
import DashboardAttachments from "./DashboardAttachments";
import Handlers from "../../Services/Toolkit/Handlers";
import { useNavigate } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";

const DashboardMain = () => {
  const {
    isLoading,
    dashboardData,
    getInitials,
    fetchSyncData,
    syncPendingItems,
  } = Handlers();

  const navigate = useNavigate();

  return (
    <>
      <section
        className={`px-[10rem] py-[6rem] w-full relative object-cover flex justify-between items-start 
        gap-[8rem] max-xl:gap-[2rem] max-xl:px-[5rem] max-md:px-[2rem]`}
      >
        <div className={`flex flex-col gap-[1rem] justify-end`}>
          <div
            className={`rounded-xl bg-white px-[3rem] py-[2rem] w-auto flex justify-center items-center gap-[10rem] 
            max-xl:gap-[4rem]`}
          >
            <div className={`flex items-center gap-[1rem]`}>
              <div className={`bg-[#624D8A] rounded-xl px-[1.2rem] py-[1rem]`}>
                <p className={`text-white text-[2rem] font-normal`}>
                  {getInitials(dashboardData?.user_name)}
                </p>
              </div>
              <div className={`flex flex-col gap-[0.5rem]`}>
                <h2 className={`text-[2.5rem] text-[#4D4D4D] font-medium`}>
                  {dashboardData?.user_name || "NA"}
                </h2>
                <p className={`text-[1.8rem] font-normal text-[#666666]`}>
                  {dashboardData?.user_mail || "NA"}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-[2rem]`}>
              <div className={`w-auto flex items-center`}>
                <ViewBtn
                  btnView={"content"}
                  btnTitle={"Messages"}
                  btnFunc={() => {
                    navigate("/messages");
                  }}
                  btnIcon={<i className="fa-regular fa-envelope" />}
                />
              </div>
              <div className={`w-auto`}>
                <LinkBtn
                  btnTitle={"Attachments"}
                  btnFunc={() => {
                    navigate("/attachments");
                  }}
                  btnIcon={<i className="fa-solid fa-paperclip" />}
                />
              </div>
              <div className={`w-auto`}>
                <ActionBtn
                  btnTitle={"Process Duplicates"}
                  btnIcon={<i className="fa-regular fa-clone" />}
                />
              </div>
            </div>
          </div>
          <div className={`flex justify-end items-center gap-[2rem] max-xl:mt-[2rem]`}>
            <p className={`text-[1.8rem] font-normal text-[#666666]`}>
              Last sync at {dashboardData?.last_synced}
            </p>
            <div className={`w-auto justify-end hidden max-xl:flex`}>
              <ViewBtn
                btnView={"content"}
                btnTitle={
                  isLoading && syncPendingItems > 0
                    ? `Syncing ${syncPendingItems} item${
                        syncPendingItems !== 1 ? "s" : ""
                      }...`
                    : "Sync"
                }
                btnFunc={isLoading ? undefined : fetchSyncData}
                btnIcon={
                  <i
                    className={`fa-solid fa-rotate ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className={`w-auto justify-end max-xl:hidden`}>
          <ViewBtn
            btnView={"content"}
            btnTitle={
              isLoading && syncPendingItems > 0
                ? `Syncing ${syncPendingItems} item${
                    syncPendingItems !== 1 ? "s" : ""
                  }...`
                : "Sync"
            }
            btnFunc={isLoading ? undefined : fetchSyncData}
            btnIcon={
              <i
                className={`fa-solid fa-rotate ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            }
          />
        </div>
      </section>

      <section
        className={`px-[10rem] pt-[0] pb-[6rem] relative object-cover w-full grid grid-cols-3 gap-[4rem] justify-center`}
      >
        <DashboardDownloads />
        <DashboardUploads />
        <DashboardMail />
      </section>

      <section
        className={`pt-[0] pb-[6rem] px-[10rem] relative object-cover w-auto grid justify-start`}
      >
        <DashboardAttachments />
      </section>
    </>
  );
};

export default DashboardMain;
