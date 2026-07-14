import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

// Colors match the Compound auth screens (see tokens.ts). Swap the hex
// values below if design hands you exact tokens later.
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1A6E76] text-white hover:bg-[#155A61] focus-visible:ring-[#1A6E76] disabled:bg-[#1A6E76]/40",
  outline:
    "bg-white text-[#1A6E76] border border-[#1A6E76] hover:bg-[#E7F2F2] focus-visible:ring-[#1A6E76] disabled:text-[#1A6E76]/40 disabled:border-[#1A6E76]/40",
  ghost:
    "bg-transparent text-[#4B5563] hover:bg-slate-100 focus-visible:ring-slate-300 disabled:text-slate-300",
  danger:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400 disabled:bg-red-500/40",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-[15px] gap-2",
};

/**
 * Reusable button for auth flows (and beyond).
 * Handles its own loading/disabled state so forms don't need to manage it separately.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center rounded-lg font-medium
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `.trim()}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
