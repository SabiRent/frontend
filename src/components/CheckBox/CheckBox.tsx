import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = "", ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={checkboxId}
        className="inline-flex items-center gap-2 cursor-pointer select-none"
      >
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-[#E2E5E9] text-[#1A6E76]
            focus:ring-2 focus:ring-[#1A6E76]/40 focus:ring-offset-0
            ${className}
          `.trim()}
          {...props}
        />
        <span className="text-xs text-[#4B5563]">{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
