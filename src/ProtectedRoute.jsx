import React from "react";
import { Navigate } from "react-router-dom";
import Handlers from "./Services/Toolkit/Handlers";

const ProtectedRoute = ({ children }) => {
  const { authSuccess } = Handlers();

  if (authSuccess === false) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
