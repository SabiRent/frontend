import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { Button } from "@/components/Button/Button";

import backgroundImg from "@/assets/images/backgroundimg.png";
import logo from "@/assets/images/Group 757.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Mock backend
    setTimeout(() => {
      setLoading(false);

      toast.success("Password reset successfully!");

      navigate("/login");
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
      <div className="w-full max-w-[470px] mt-2">
        <AuthCard
          headerSlot={
            <BackLink title="Reset Password" onBack={() => navigate(-1)} />
          }
        >
          <div className="mb-4 rounded-xl border border-[#D0D5DD] p-4 text-[13px] leading-5 text-[#667085]">
            Please enter your new password below. Make sure it is secure and
            easy for you to remember.
          </div>

          <PasswordInput
            label="New Password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm Password"
            required
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            fullWidth
            size="lg"
            isLoading={loading}
            onClick={handleSubmit}
            className="mt-5 h-10"
          >
            <Lock className="mr-2 h-4 w-4" />
            Reset Password
          </Button>
        </AuthCard>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
