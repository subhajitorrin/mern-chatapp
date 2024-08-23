import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = true;
  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"}/>;
}

export default ProtectedRoute;
