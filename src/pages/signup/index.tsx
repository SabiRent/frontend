import { zodResolver } from "@hookform/resolvers/zod";
import { Apple, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import backgroundImg from "@/assets/images/auth-background.png";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { TextInput } from "@/components/TextInput/TextInput";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { ErrorCode } from "@/constants/error-codes";
import { AppRoutes } from "@/constants/routes";
import { useSignup } from "@/hooks/useSignup";
import { getApiErrorCode } from "@/services/api/errors";
import { signupSchema, type SignupForm } from "@/validations/auth";

const getSignupErrorMessage = (error: unknown) => {
  switch (getApiErrorCode(error)) {
    case ErrorCode.DUPLICATE_ENTRY:
      return "An account with this email already exists. Please log in.";
    default:
      return "We could not create your account. Please try again.";
  }
};

const SignupPage = () => {
  const navigate = useNavigate();
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (values: SignupForm) => {
    signup.mutate(values, {
      onSuccess: (response) => {
        toast.success(response.message || "Your account has been created.");
        navigate(AppRoutes.login);
      },
      onError: (error) => {
        toast.error(getSignupErrorMessage(error));
      },
    });
  };

  return (
    <AuthLayout
      backgroundImageUrl={backgroundImg}
      logoSlot={
        <Link
          to={AppRoutes.landing}
          className="inline-flex w-fit items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="My Compound home"
        >
          <img src={logo} alt="My Compound" className="w-60" />
        </Link>
      }
      cardPosition="center"
    >
      <div className="my-5 flex w-full items-center justify-center px-5 py-5 sm:px-12">
        <div className="w-full max-w-[520px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-2xl bg-[#F8FAFC] px-6 py-8 shadow-[0_28px_70px_rgba(0,0,0,0.26)] sm:min-h-[665px] sm:px-10 sm:py-11"
          >
            <div className="mb-6">
              <h1 className="text-[28px] font-bold leading-tight tracking-normal text-[#111827]">
                New User?
              </h1>
              <p className="mt-2 text-[17px] leading-6 text-[#9CA3AF]">
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
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <TextInput
                label="Email"
                required
                type="email"
                placeholder="Email"
                autoComplete="email"
                icon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register("email")}
              />

              <PasswordInput
                label="Password"
                required
                placeholder="Password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
              />

              <PasswordInput
                label="Confirm password"
                required
                placeholder="Confirm password"
                autoComplete="new-password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={signup.isPending}
              className="mt-8 h-10"
            >
              Create Account
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
              Have account?{" "}
              <Link
                to={AppRoutes.login}
                className="font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
