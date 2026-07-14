import { User, Mail } from "lucide-react";
import { AuthLayout, AuthCard } from "../layout";
import { TextInput } from "../TextInput";
import { PasswordInput } from "../PasswordInput";
import { Button } from "../Button";
import { Divider } from "../Inputs";
import { AuthSocial } from "../AuthSocial";

/**
 * "New User?" sign-up screen.
 * Swap `backgroundImageUrl` and `logoSlot` for the real assets, and
 * wire up your form state / submit handler.
 */
export function Signup() {
  return (
    <AuthLayout
      backgroundImageUrl="/images/auth-bg.jpg"
      logoSlot={<img src="/logo.svg" alt="My Compound" className="h-6" />}
    >
      <AuthCard
        title="New User?"
        subtitle="Enter your details to create an account."
      >
        <form className="flex flex-col gap-4">
          <TextInput
            label="Full Name"
            required
            icon={<User className="h-4 w-4" />}
            placeholder="Full Name"
          />
          <TextInput
            label="Email"
            required
            icon={<Mail className="h-4 w-4" />}
            placeholder="Email"
            type="email"
          />
          <PasswordInput label="Password" required placeholder="Password" />
          <PasswordInput
            label="Confirm Password"
            required
            placeholder="Confirm Password"
          />

          <Button type="submit" fullWidth>
            Create Account
          </Button>

          <Divider />

          <div className="grid grid-cols-2 gap-3">
            <AuthSocial provider="google" />
            <AuthSocial provider="apple" />
          </div>

          <p className="text-center text-sm text-[#4B5563]">
            Have account?{" "}
            <a
              href="/login"
              className="text-[#1A6E76] font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
