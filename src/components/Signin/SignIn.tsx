import { Mail } from "lucide-react";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { AuthCard } from "../AuthCard/AuthCard";
import { TextInput } from "../TextInput/TextInput";
import { PasswordInput } from "../PasswordInput/PasswordInput";
import { Checkbox } from "../CheckBox/CheckBox";
import { Divider } from "../Divider/Divider";
import { Button } from "../Button/Button";
import { AuthSocial } from "../AuthSocial/AuthSocial";

/** "Welcome Back!" sign-in screen. */
export function Signin() {
  return (
    <AuthLayout
      backgroundImageUrl="/images/auth-bg.jpg"
      logoSlot={<img src="/logo.svg" alt="My Compound" className="h-6" />}
      cardPosition="right"
    >
      <AuthCard title="Welcome Back!" subtitle="Sign into your account">
        <form className="flex flex-col gap-4">
          <TextInput
            label="Email"
            required
            icon={<Mail className="h-4 w-4" />}
            placeholder="Email"
            type="email"
          />
          <PasswordInput label="Password" required placeholder="Password" />

          <div className="flex items-center justify-between -mt-1">
            <Checkbox label="Remember me" />
            <a
              href="/forgot-password"
              className="text-sm text-[#1A6E76] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <Button type="submit" fullWidth>
            Sign In
          </Button>

          <Divider />

          <div className="grid grid-cols-2 gap-3">
            <AuthSocial provider="google" />
            <AuthSocial provider="apple" />
          </div>

          <p className="text-center text-sm text-[#4B5563]">
            New User?{" "}
            <a
              href="/signup"
              className="text-[#1A6E76] font-medium hover:underline"
            >
              Create account
            </a>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
