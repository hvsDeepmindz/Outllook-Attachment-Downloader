import React, { useEffect } from "react";
import Nav from "../../Components/Header/Nav";
import DashboardMain from "../../Features/FeatureDashboard/DashboardMain";

const Dashboard = () => {
  useEffect(() => {
    console.log(`Testing`);
  }, []);

  return (
    <>
      <Nav />
      <div className={`relative object-cover w-full mt-[9rem] bg-[#f2f2f2]`}>
        <DashboardMain />
      </div>
    </>
  );
};

export default Dashboard;
