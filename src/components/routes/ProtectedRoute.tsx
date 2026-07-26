import { Navigate, Outlet } from "react-router";

import { AppRoutes } from "@/constants/routes";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to={AppRoutes.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
