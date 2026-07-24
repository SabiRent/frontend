import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

import backgroundImg from "@/assets/images/auth-background.png";
import logo from "@/assets/images/logo.png";
import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AppRoutes } from "@/constants/routes";
import { useResetPassword } from "@/hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordForm,
} from "@/validations/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPassword = useResetPassword();
  const token = searchParams.get("token") ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (values: ResetPasswordForm) => {
    if (!token) {
      toast.error("This reset link is missing. Please request another one.");
      return;
    }

    resetPassword.mutate(
      {
        token,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          toast.success(
            "Your password has been updated successfully. You can now log in.",
          );
          navigate(AppRoutes.login);
        },
        onError: () => {
          toast.error(
            "This reset link has expired or is not valid. Please request a new one.",
          );
        },
      },
    );
  };

  return (
    <AuthLayout
      backgroundImageUrl={backgroundImg}
      logoSlot={<img src={logo} alt="MyCompound" className="w-60" />}
      cardPosition="center"
    >
      <div className="mt-2 w-full max-w-[470px]">
        <AuthCard
          headerSlot={
            <BackLink
              title="Reset Password"
              onBack={() => navigate(AppRoutes.login)}
            />
          }
        >
          <div className="mb-4 rounded-xl border border-[#D0D5DD] p-4 text-[13px] leading-5 text-[#667085]">
            Please enter your new password below. Make sure it is secure and
            easy for you to remember.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <PasswordInput
              label="New Password"
              required
              placeholder="Enter new password"
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />

            <PasswordInput
              label="Confirm Password"
              required
              placeholder="Confirm new password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={resetPassword.isPending}
              className="mt-1 h-10"
            >
              <Lock className="mr-2 h-4 w-4" />
              Update Password
            </Button>
          </form>
        </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
