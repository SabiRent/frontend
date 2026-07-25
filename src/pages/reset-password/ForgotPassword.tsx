import backgroundImg from "@/assets/images/auth-background.png";
import logo from "@/assets/images/logo.png";
import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { Button } from "@/components/Button/Button";
import { TextInput } from "@/components/TextInput/TextInput";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AppRoutes } from "@/constants/routes";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordForm,
} from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPassword = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: ForgotPasswordForm) => {
    forgotPassword.mutate(values, {
      onSuccess: () => {
        reset();
        toast.success(
          "If this email is registered, you will receive a link to reset your password.",
        );
      },
      onError: () => {
        toast.error("We could not send the reset link. Please try again.");
      },
    });
  };

  return (
    <AuthLayout
      backgroundImageUrl={backgroundImg}
      logoSlot={<img src={logo} alt="MyCompound" className="w-60" />}
      cardPosition="center"
    >
      <div className="-mt-4 w-full max-w-[470px]">
        <AuthCard
          headerSlot={
            <BackLink
              title="Reset Password"
              onBack={() => navigate(AppRoutes.login)}
            />
          }
        >
          <div className="mb-4 rounded-xl border border-[#D0D5DD] p-4 text-[13px] leading-5 text-[#667085]">
            To reset your password, submit your registered email address below.
            <br />
            We will send you a link to reset your password.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <TextInput
              label="Email"
              required
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Button
              type="submit"
              isLoading={forgotPassword.isPending}
              fullWidth
              size="lg"
              className="mt-2 h-9"
            >
              <Lock className="mr-2 h-4 w-4" />
              Reset password
            </Button>
          </form>
        </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
