import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

  const { isLoggedIn, role, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) return <div>Checking auth...</div>;

  return isLoggedIn && allowedRoles.includes(role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
