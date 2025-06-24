import React from "react";
import ViewBtn from "../../Components/Btns/ViewBtn";
import LinkBtn from "../../Components/Btns/LinkBtn";
import ActionBtn from "../../Components/Btns/ActionBtn";
import DashboardDownloads from "./DashboardDownloads";
import DashboardUploads from "./DashboardUploads";
import DashboardMail from "./DashboardMail";

const DashboardMain = () => {
  return (
    <>
      <section
        className={`px-[10rem] py-[6rem] w-full relative object-cover max-md:px-[2rem] flex justify-between items-start 
        gap-[8rem]`}
      >
        <div className={`flex flex-col gap-[1rem] justify-end`}>
          <div
            className={`rounded-xl bg-white px-[3rem] py-[2rem] w-auto flex justify-center items-center gap-[10rem]`}
          >
            <div className={`flex items-center gap-[1rem]`}>
              <div className={`bg-[#624D8A] rounded-xl px-[1.2rem] py-[1rem]`}>
                <p className={`text-white text-[2rem] font-normal`}>BR</p>
              </div>
              <div className={`flex flex-col gap-[0.5rem]`}>
                <h2 className={`text-[2.5rem] text-[#4D4D4D] font-medium`}>
                  Bhumika Rawat
                </h2>
                <p className={`text-[1.8rem] font-normal text-[#666666]`}>
                  Bhumikarawat.br0@gmail.com
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-[2rem]`}>
              <div className={`w-auto`}>
                <ViewBtn
                  btnTitle={"Messages"}
                  btnIcon={<i className="fa-regular fa-envelope" />}
                />
              </div>
              <div className={`w-auto`}>
                <LinkBtn
                  btnTitle={"Attachments"}
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
            <div className={`flex justify-end cursor-pointer`}>
              <i className="fa-regular fa-trash-can text-[2.5rem] text-[grey]" />
            </div>
          </div>
          <div className={`flex justify-end`}>
            <p className={`text-[1.8rem] font-normal text-[#666666]`}>
              last sync at 3:30 pm, Today
            </p>
          </div>
        </div>
        <div className={`w-auto justify-end`}>
          <ViewBtn
            btnTitle={"Sync"}
            btnIcon={<i className="fa-solid fa-rotate" />}
          />
        </div>
      </section>

      <section
        className={`px-[10rem] py-[6rem] relative object-cover w-full grid grid-cols-3 gap-[4rem] justify-center`}
      >
        <DashboardDownloads />
        <DashboardUploads />
        <DashboardMail />
      </section>
    </>
  );
};

export default DashboardMain;
