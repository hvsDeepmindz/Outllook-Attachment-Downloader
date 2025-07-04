/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Nav from "../../Components/Header/Nav";
import SearchFilter from "../../Components/Card/SearchFilter";
import AttachmentsMain from "../../Features/FeatureAttachments/AttachmentsMain";

const Attachments = () => {
  return (
    <>
      <Nav />
      <div
        className={`relative object-cover w-full h-screen mt-[9rem] bg-[#f2f2f2]`}
      >
        <SearchFilter
          pageTitle="Attachments"
          filterView={false}
          attachmentView={false}
          searchView={false}
        />
        <AttachmentsMain />
      </div>
    </>
  );
};

export default Attachments;
