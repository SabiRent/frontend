import { AppRoutes } from "@/constants/routes";

import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login";
import ForgotPassword from "@/pages/reset-password/ForgotPassword";
import ResetPassword from "@/pages/reset-password/ResetPassword";
import SignupPage from "@/pages/signup";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import PublicRoute from "@/components/routes/PublicRoute";

import Dashboard from "@/pages/dashboard/Dashboard";
import Payments from "@/pages/dashboard/payments";
import Properties from "@/pages/dashboard/properties";
import Reports from "@/pages/dashboard/reports";
import Settings from "@/pages/dashboard/settings";
import Tenants from "@/pages/dashboard/tenants";
import Units from "@/pages/dashboard/units";

import NotFoundPage from "@/pages/NotFound";

import { Route, Routes } from "react-router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.landing} element={<LandingPage />} />

      {/* Public auth pages */}
      <Route element={<PublicRoute />}>
        <Route path={AppRoutes.login} element={<LoginPage />} />
        <Route path={AppRoutes.signup} element={<SignupPage />} />
      </Route>

      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />

      {/* Protected dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.dashboard} element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path={AppRoutes.dashboardProperties}
            element={<Properties />}
          />
          <Route path={AppRoutes.dashboardUnits} element={<Units />} />
          <Route path={AppRoutes.dashboardTenants} element={<Tenants />} />
          <Route path={AppRoutes.dashboardPayments} element={<Payments />} />
          <Route path={AppRoutes.dashboardReports} element={<Reports />} />
          <Route path={AppRoutes.dashboardSettings} element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
