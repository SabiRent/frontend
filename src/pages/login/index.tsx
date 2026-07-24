import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/CheckBox/CheckBox";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { TextInput } from "@/components/TextInput/TextInput";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AppRoutes } from "@/constants/routes";
import backgroundImg from "@/assets/images/auth-background.png";
import logo from "@/assets/images/logo.png";
import { Apple, Mail } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
const LOGIN_ENDPOINT = `${API_BASE_URL}/api/v1/auth/login`;

type ApiErrorResponse = {
  error?: string;
  errors?: unknown;
  message?: string | string[];
};

type LoginResponse = {
  data?: {
    accessToken?: string;
    user?: {
      email?: string;
      id?: string;
      role?: string;
    };
  };
  message?: string;
  success?: boolean;
};

const getReadableApiMessage = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(getReadableApiMessage).filter(Boolean).join(" ");
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const directMessage =
      getReadableApiMessage(record.message) ??
      getReadableApiMessage(record.error) ??
      getReadableApiMessage(record.errors);

    if (directMessage) {
      return directMessage;
    }

    return Object.values(record)
      .map(getReadableApiMessage)
      .filter(Boolean)
      .join(" ");
  }

  return undefined;
};

const getLoginErrorMessage = async (response: Response) => {
  const fallbackMessage =
    response.status === 404
      ? "Login endpoint was not found. Please check the API base URL."
      : `Unable to login. (${response.status})`;

  try {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      const data = (await response.json()) as ApiErrorResponse;
      const message = getReadableApiMessage(data);

      return message || fallbackMessage;
    }

    const text = await response.text();
    return text || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(await getLoginErrorMessage(response));
      }

      const data = (await response.json()) as LoginResponse;
      const accessToken = data.data?.accessToken;
      const user = data.data?.user;

      if (!accessToken) {
        throw new Error("Login succeeded, but no access token was returned.");
      }

      localStorage.setItem("accessToken", accessToken);

      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
      }

      toast.success(data.message || "Login successful.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
          <img
            src={logo}
            alt="My Compound"
            className="h-auto w-[230px] max-w-[64vw]"
          />
        </Link>
      }
      cardPosition="center"
    >
      <div className="flex max-h-screen w-full items-center justify-center px-5 py-5 sm:px-12">
        <div className="w-full max-w-[455px] max-h-[calc(100vh-2.5rem)] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl bg-[#F8FAFC] px-6 py-8 shadow-[0_28px_70px_rgba(0,0,0,0.26)] sm:min-h-[510px] sm:px-10 sm:py-11"
          >
            <div className="mb-6">
              <h1 className="text-[24px] font-bold leading-tight tracking-normal text-[#111827]">
                Welcome Back!
              </h1>
              <p className="mt-2 text-sm leading-5 text-[#9CA3AF]">
                Login into your account
              </p>
            </div>

            <div className="space-y-[14px]">
              <TextInput
                label="Email"
                required
                type="email"
                placeholder="Email"
                autoComplete="email"
                icon={<Mail className="h-4 w-4" />}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <PasswordInput
                label="Password"
                required
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-4">
              <Checkbox label="Remember me" />
              <Link
                to={AppRoutes.forgotPassword}
                className="text-xs font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              className="mt-7 h-10"
            >
              Login
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
              New User?{" "}
              <Link
                to={AppRoutes.signup}
                className="font-medium text-[#1A8EA0] hover:text-[#155A61]"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
