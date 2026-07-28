import { Navigate, Outlet } from "react-router";

import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/stores/authStore";

const PublicRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to={AppRoutes.dashboard} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
