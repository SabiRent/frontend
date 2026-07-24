import { AppRoutes } from "@/constants/routes";

import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgotPassword from "@/pages/reset-password/ForgotPassword";
import ResetPassword from "@/pages/reset-password/ResetPassword";

import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";

import Dashboard from "@/pages/dashboard/Dashboard";
import Properties from "@/pages/dashboard/properties";
import Units from "@/pages/dashboard/units";
import Tenants from "@/pages/dashboard/tenants";
import Payments from "@/pages/dashboard/payments";
import Reports from "@/pages/dashboard/reports";
import Settings from "@/pages/dashboard/settings";

import NotFoundPage from "@/pages/NotFound";

import { Route, Routes } from "react-router";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path={AppRoutes.landing} element={<LandingPage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="units" element={<Units />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
