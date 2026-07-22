import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { Button } from "@/components/Button/Button";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";

import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import backgroundImg from "@/assets/images/auth-background.png";
import logo from "@/assets/images/logo.png";
import { AppRoutes } from "@/constants/routes";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);

    setTimeout(() => {
      toast.success("Verification link has been sent to your email.");

      setLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      backgroundImageUrl={backgroundImg}
      logoSlot={<img src={logo} alt="MyCompound" className="w-60" />}
      cardPosition="center"
    >
      {/* Wrapper to visually enlarge the card without editing AuthCard */}
      <div className="w-full max-w-[470px] -mt-4">
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
            We will send an email with instructions on how to get access again.
          </div>

          <PasswordInput
            label="Email"
            required
            placeholder="Enter Your Email"
          />

          <Button
            onClick={handleSubmit}
            isLoading={loading}
            fullWidth
            size="lg"
            className="mt-6 h-9"
          >
            <Lock className="mr-2 h-4 w-4" />
            Reset password
          </Button>
        </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
