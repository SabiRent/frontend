import { Apple, Mail } from "lucide-react";
import { Link } from "react-router";
import compoundLogo from "@images/my-compound.png";
import signupWallpaper from "@images/signup-wallpaper.png";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/CheckBox/CheckBox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { TextInput } from "@/components/TextInput/TextInput";
import { AppRoutes } from "@/constants/routes";

const LoginPage = () => {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#111827] bg-cover bg-center px-5 py-5 sm:px-12"
      style={{ backgroundImage: `url(${signupWallpaper})` }}
    >
      <div className="absolute inset-0 bg-[#120C0C]/65" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[1440px] flex-col">
        <Link
          to={AppRoutes.landing}
          className="inline-flex w-fit items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="My Compound home"
        >
          <img
            src={compoundLogo}
            alt="My Compound"
            className="h-auto w-[230px] max-w-[64vw]"
          />
        </Link>

        <section className="flex flex-1 items-center justify-center py-3">
          <form className="w-full max-w-[455px] rounded-2xl bg-[#F8FAFC] px-6 py-8 shadow-[0_28px_70px_rgba(0,0,0,0.26)] sm:min-h-[510px] sm:px-10 sm:py-11">
            <div className="mb-6">
              <h1 className="text-[24px] font-bold leading-tight tracking-normal text-[#111827]">
                Welcome Back!
              </h1>
              <p className="mt-2 text-sm leading-5 text-[#9CA3AF]">
                Login into your account
              </p>
            </div>

            <div className="space-y-[14px]">
              <TextInput
                label="Email"
                required
                type="email"
                placeholder="Email"
                autoComplete="email"
                icon={<Mail className="h-4 w-4" />}
              />

              <PasswordInput
                label="Password"
                required
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <Checkbox label="Remember me" />
              <Link
                to="/reset-password"
                className="text-xs font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" fullWidth className="mt-7 h-10">
              Login
            </Button>

            <div className="my-4 flex items-center gap-6 text-base text-[#6B7280]">
              <span className="h-px flex-1 border-t-2 border-dotted border-[#B8C0CC]" />
              <span>or</span>
              <span className="h-px flex-1 border-t-2 border-dotted border-[#B8C0CC]" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#1A8EA0] bg-white px-3 text-[11px] font-medium text-[#1A6E76] transition-colors hover:bg-[#E7F2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6E76]/40"
              >
                <span className="text-lg font-bold text-[#1A8EA0]">G</span>
                <span className="whitespace-nowrap">Continue with Google</span>
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#1A8EA0] bg-white px-3 text-[11px] font-medium text-[#1A6E76] transition-colors hover:bg-[#E7F2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6E76]/40"
              >
                <Apple className="h-4 w-4 fill-black text-black" />
                <span className="whitespace-nowrap">Continue with Apple</span>
              </button>
            </div>

            <p className="mt-3 text-center text-sm text-[#111827]">
              New User?{" "}
              <Link
                to={AppRoutes.signup}
                className="font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Create account
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
