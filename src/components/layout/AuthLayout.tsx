import type { ReactNode } from "react";

interface AuthLayoutProps {
  backgroundImageUrl: string;
  logoSlot: ReactNode; // drop in the real Compound logo SVG/img here
  children: ReactNode; // the AuthCard
  cardPosition?: "center" | "right";
}

/**
 * Full-bleed background layout shared by all auth screens.
 * Logo sits top-left over the photo; the card floats center or center-right,
 * matching the two layouts seen across the Sign Up / Sign In screens.
 */
export function AuthLayout({
  backgroundImageUrl,
  logoSlot,
  children,
  cardPosition = "center",
}: AuthLayoutProps) {
  return (
    <div
      className="relative flex min-h-screen w-full items-center overflow-y-auto bg-no-repeat px-4 py-6 sm:px-6 md:px-16"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        justifyContent: cardPosition === "right" ? "flex-end" : "center",
      }}
    >
      <div className="absolute top-12 left-10 md:top-14 xl:left-14 hidden lg:block">
        {logoSlot}
      </div>
      {children}
    </div>
  );
}
