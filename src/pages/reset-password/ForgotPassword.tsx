import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { AuthCard } from "@/components/AuthCard/AuthCard";
import { BackLink } from "@/components/BackLink/BackLink";
import { Button } from "@/components/Button/Button";

import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

import backgroundImg from "@/assets/images/backgroundimg.png";
import logo from "@/assets/images/Group 757.png";

import { AppRoutes } from "@/constants/routes";

import { toast } from "sonner";
import { forgotPassword } from "@/api/auth";
import { TextInput } from "@/components/TextInput/TextInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    console.log("✅ Button clicked");
    console.log("📧 Email:", email);

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);

      console.log("✅ API Response:", response);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      console.error("❌ Full Error:", error);

      const isErrorWithResponse = (
        value: unknown,
      ): value is { response?: { data?: { message?: string } } } => {
        return (
          typeof value === "object" && value !== null && "response" in value
        );
      };

      if (isErrorWithResponse(error)) {
        console.error("❌ Response:", error.response);
        console.error("❌ Data:", error.response?.data);
      }

      toast.error(
        isErrorWithResponse(error)
          ? (error.response?.data?.message ?? "Something went wrong.")
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
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

          <TextInput
            label="Email"
            required
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
