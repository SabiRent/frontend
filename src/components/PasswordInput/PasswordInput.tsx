import { forwardRef, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { TextInput } from "../TextInput/TextInput";
import type { TextInputProps } from "../TextInput/TextInput";

export type PasswordInputProps = Omit<
  TextInputProps,
  "icon" | "rightSlot" | "type"
>;

/**
 * Password field matching the Compound design: lock icon on the left,
 * eye/eye-off toggle on the right to reveal the value.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <TextInput
        ref={ref}
        type={visible ? "text" : "password"}
        icon={<Lock className="h-4 w-4" />}
        rightSlot={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
