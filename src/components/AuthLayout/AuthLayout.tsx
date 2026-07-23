import type { ReactNode } from "react";

interface AuthLayoutProps {
  backgroundImageUrl: string;
  logoSlot: ReactNode;
  children: ReactNode;
  cardPosition?: "center" | "right";
}

export function AuthLayout({
  backgroundImageUrl,
  logoSlot,
  children,
  cardPosition = "center",
}: AuthLayoutProps) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center flex items-start px-6 pt-24 md:px-16"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        justifyContent: cardPosition === "right" ? "flex-end" : "center",
      }}
    >
      <div className="absolute top-12 left-10 md:top-14 md:left-14">
        {logoSlot}
      </div>

      {children}
    </div>
  );
}
