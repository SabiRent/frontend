import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { Button } from "@/components/Button/Button";

import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import backgroundImg from "@/assets/images/backgroundimg.png";
import logo from "@/assets/images/Group 757.png";
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
      logoSlot={
        <img
          src={logo}
          alt="MyCompound"
          className="w-[180px] h-auto object-contain"
        />
      }
      cardPosition="center"
    >
      {/* Wrapper to visually enlarge the card without editing AuthCard */}
      <div className="w-full max-w-[470px] -mt-4">
        <AuthCard
          headerSlot={
            <BackLink title="Reset Password" onBack={() => navigate(-1)} />
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
