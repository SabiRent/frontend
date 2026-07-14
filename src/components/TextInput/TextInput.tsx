import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  icon?: ReactNode; // e.g. <User className="h-4 w-4" />
  rightSlot?: ReactNode; // e.g. password eye toggle button
  error?: string;
}

/**
 * Labeled input matching the Compound auth fields:
 * label + red required asterisk, left icon, light bordered field, error copy below.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, required, icon, rightSlot, error, id, className = "", ...props },
    ref,
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-[#1F2937]">
          {label}
          {required && <span className="text-[#E11D48] ml-0.5">*</span>}
        </label>

        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              w-full h-11 rounded-lg border bg-white text-sm text-[#1F2937]
              placeholder:text-[#9CA3AF]
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-[#1A6E76]/40 focus:border-[#1A6E76]
              ${icon ? "pl-10" : "pl-3"}
              ${rightSlot ? "pr-10" : "pr-3"}
              ${error ? "border-[#E11D48]" : "border-[#E2E5E9]"}
              ${className}
            `.trim()}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          {rightSlot && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightSlot}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[#E11D48]">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
