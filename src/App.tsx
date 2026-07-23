import { AppRoutes } from "@/constants/routes";

import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import ForgotPassword from "@/pages/reset-password/ForgotPassword";
import ResetPassword from "@/pages/reset-password/ResetPassword";
import Dashboard from "@/pages/dashboard/Dashboard";
import NotFoundPage from "@/pages/NotFound";

import { Route, Routes } from "react-router";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.landing} element={<LandingPage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path={AppRoutes.forgotPassword} element={<ForgotPassword />} />
      <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
