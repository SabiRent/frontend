import { Navigate, Outlet } from "react-router";

import { AppRoutes } from "@/constants/routes";

const PublicRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
