import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className={`w-full relative object-cover`}>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
