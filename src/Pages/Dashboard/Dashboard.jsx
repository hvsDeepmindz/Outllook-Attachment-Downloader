import React from "react";
import Nav from "../../Components/Header/Nav";
import DashboardMain from "../../Features/FeatureDashboard/DashboardMain";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className={`relative object-cover w-full mt-[8rem] bg-[#f2f2f2]`}>
        <DashboardMain />
      </div>
    </>
  );
};

export default Dashboard;
