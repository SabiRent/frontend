import type { ReactNode } from "react";

interface SuccessAlertProps {
  variant?: "success" | "error" | "neutral";
  children: ReactNode;
}

const variantStyles = {
  success: "bg-[#E7F7EE] border-[#BEE8CE] text-[#1F7A4D]",
  error: "bg-red-50 border-red-200 text-red-700",
  neutral: "bg-slate-50 border-slate-200 text-[#4B5563]",
};

/**
 * Banner used for the reset-password confirmation state
 * ("Instructions sent to your email...") and general form-level messages.
 */
export function SuccessAlert({
  variant = "neutral",
  children,
}: SuccessAlertProps) {
  return (
    <div
      className={`rounded-lg border p-3 text-sm leading-snug ${variantStyles[variant]}`}
    >
      {children}
    </div>
  );
}
