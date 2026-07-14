import type { ReactNode, CSSProperties } from "react";

interface BackgroundProps {
  image: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Background({
  image,
  children,
  className = "",
  style,
}: BackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
