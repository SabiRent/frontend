import { Apple, Mail, User } from "lucide-react";
import { Link } from "react-router";
import compoundLogo from "@images/my-compound.png";
import signupWallpaper from "@images/signup-wallpaper.png";
import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { TextInput } from "@/components/TextInput/TextInput";
import { AppRoutes } from "@/constants/routes";

const SignupPage = () => {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#111827] bg-cover bg-center px-5 py-8 sm:px-12"
      style={{ backgroundImage: `url(${signupWallpaper})` }}
    >
      <div className="absolute inset-0 bg-[#120C0C]/65" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1440px] flex-col">
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

        <section className="flex flex-1 items-center justify-center py-7">
          <form className="w-full max-w-[530px] rounded-2xl bg-[#F8FAFC] px-8 py-12 shadow-[0_28px_70px_rgba(0,0,0,0.26)] sm:min-h-[755px] sm:px-[86px] sm:py-[70px]">
            <div className="mb-9">
              <h1 className="text-[28px] font-bold leading-tight tracking-normal text-[#111827]">
                New User?
              </h1>
              <p className="mt-3 text-[17px] leading-6 text-[#9CA3AF]">
                Enter your details to create an account.
              </p>
            </div>

            <div className="space-y-[14px]">
              <TextInput
                label="Full name"
                required
                type="text"
                placeholder="Full name"
                autoComplete="name"
                icon={<User className="h-4 w-4" />}
              />

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
                autoComplete="new-password"
              />

              <PasswordInput
                label="Confirm password"
                required
                placeholder="Confirm password"
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" fullWidth className="mt-12 h-10">
              Create Account
            </Button>

            <div className="my-5 flex items-center gap-6 text-base text-[#6B7280]">
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

            <p className="mt-4 text-center text-sm text-[#111827]">
              Have account?{" "}
              <Link
                to={AppRoutes.login}
                className="font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignupPage;
