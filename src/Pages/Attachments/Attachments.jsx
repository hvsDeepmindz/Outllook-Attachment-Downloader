import React, { useEffect } from "react";
import Nav from "../../Components/Header/Nav";
import SearchFilter from "../../Components/Card/SearchFilter";
import AttachmentsMain from "../../Features/FeatureAttachments/AttachmentsMain";
import Handlers from "../../Services/Toolkit/Handlers";

const Attachments = () => {
  const { fetchDashboardData } = Handlers();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <Nav />
      <div
        className={`relative object-cover w-full h-full mt-[9rem] bg-[#f2f2f2]`}
      >
        <AttachmentsMain />
      </div>
    </>
  );
};

export default Attachments;
