import type { ReactNode } from "react";

interface AuthCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  headerSlot?: ReactNode; // e.g. BackHeader instead of title, for reset-password steps
  classname?: string;
}

/**
 * White rounded card used for every auth screen (Sign Up, Sign In, Reset Password).
 * Pass either `title`/`subtitle`, or a fully custom `headerSlot`.
 */
export function AuthCard({
  title,
  subtitle,
  children,
  headerSlot,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-[416px] rounded-[16px] bg-[#FCFCFD] shadow-xl px-10 py-18">
      {headerSlot ? (
        headerSlot
      ) : (
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#1F2937]">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[#4B5563] mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
