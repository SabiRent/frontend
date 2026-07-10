import { AppRoutes } from "@/constants/routes";
import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/NotFound";
import SignupPage from "@/pages/signup";
import { Route, Routes } from "react-router";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={AppRoutes.landing} element={<LandingPage />} />
      <Route path={AppRoutes.login} element={<LoginPage />} />
      <Route path={AppRoutes.signup} element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
