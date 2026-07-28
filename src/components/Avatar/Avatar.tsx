import LazyImage from "@/components/Avatar/LazyImage";
import { getInitials } from "@/utils/helper";
import React from "react";
import { PulseLoader } from "react-spinners";

const textColorClasses = {
  p100: "text-[#4006B8]",
  white: "text-white",
  secondary: "text-[#56565E]",
};
const bgColorClasses = {
  p100: "bg-[#EFE6F7]",
  primary: "bg-primary",
  secondary: "bg-[#EFE6F7]",
};

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  fullname?: string;
  colorStyles?: {
    bgColor: keyof typeof bgColorClasses;
    textColor: keyof typeof textColorClasses;
  };
}

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const sizeClasses = {
  xs: "!w-6 !h-6 text-xs",
  sm: "!w-8 !h-8 text-sm",
  md: "!w-12 !h-12 text-base",
  lg: "!w-16 !h-16 text-lg",
  xl: "!w-24 !h-24 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  className = "",
  fullname,
  colorStyles,
}) => {
  const bgColor =
    bgColorClasses[
      (colorStyles?.bgColor as keyof typeof bgColorClasses) ?? "primary"
    ];
  const textColor =
    textColorClasses[
      (colorStyles?.textColor as keyof typeof textColorClasses) ?? "white"
    ];
  const sizeClass = sizeClasses[size];
  const dimensionSize = sizeMap[size];

  const initials = getInitials(fullname ?? "");
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden rounded-full shrink-0 ${bgColor} ${sizeClass} ${className}`}
    >
      {src ? (
        <LazyImage
          src={src}
          placeholder={<PulseLoader size={5} color="#173B67" />}
          className={`object-cover w-full h-full rounded-full`}
          alt={alt}
          width={dimensionSize}
          height={dimensionSize}
        />
      ) : (
        <span className={`font-medium ${textColor}`}>{initials}</span>
      )}
    </div>
  );
};
