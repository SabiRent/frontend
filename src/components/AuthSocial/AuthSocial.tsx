import type { ButtonHTMLAttributes } from "react";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.54-5.17 3.54-8.65z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.93H1.3v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.59H1.3A11.98 11.98 0 000 12c0 1.93.46 3.76 1.3 5.41l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.59l4.01 3.09c.94-2.83 3.58-4.93 6.69-4.93z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#000"
      aria-hidden="true"
    >
      <path d="M16.36 1.43c0 1.14-.42 2.2-1.24 3.06-.85.88-2.14 1.55-3.24 1.46-.13-1.11.42-2.27 1.2-3.05.85-.86 2.34-1.5 3.28-1.47zM20.6 17.24c-.5 1.15-.74 1.65-1.38 2.66-.9 1.42-2.17 3.19-3.74 3.2-1.4.02-1.76-.9-3.65-.9-1.9 0-2.29.88-3.68.92-1.57.05-2.76-1.53-3.66-2.95C1.72 16.99.75 12.7 2.2 9.83c.72-1.42 2.02-2.32 3.44-2.34 1.38-.03 2.68.93 3.53.93.84 0 2.42-1.15 4.09-.98.7.03 2.65.28 3.9 2.11-.1.06-2.33 1.36-2.31 4.06.03 3.23 2.84 4.31 2.87 4.32-.02.07-.44 1.53-1.12 3.31z" />
    </svg>
  );
}

interface AuthSocialProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple";
}

/** "Continue with Google/Apple" button, matching the Compound outline style. */
export function AuthSocial({
  provider,
  className = "",
  ...props
}: AuthSocialProps) {
  const label =
    provider === "google" ? "Continue with Google" : "Continue with Apple";

  return (
    <button
      type="button"
      className={`
        inline-flex items-center justify-center gap-2 h-11 px-3 rounded-lg text-sm font-medium
        bg-white text-[#1A6E76] border border-[#1A6E76] hover:bg-[#E7F2F2]
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A6E76] focus-visible:ring-offset-2
        ${className}
      `.trim()}
      {...props}
    >
      {provider === "google" ? <GoogleIcon /> : <AppleIcon />}
      {label}
    </button>
  );
}
