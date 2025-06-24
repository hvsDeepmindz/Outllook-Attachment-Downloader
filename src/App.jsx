import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className={`w-full relative object-cover`}>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
