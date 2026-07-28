import { Navigate, Outlet } from "react-router";

import { AppRoutes } from "@/constants/routes";
import { useAuthStore } from "@/stores/authStore";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to={AppRoutes.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
