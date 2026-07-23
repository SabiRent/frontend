import type { ReactNode } from "react";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3
        rounded-lg
        px-4 py-3
        text-sm font-medium
        transition-all duration-200 ease-in-out

        ${
          active
            ? "bg-[#167589] text-white shadow-sm"
            : "text-white/80 hover:bg-[#E7FBF2] hover:text-[#105361]"
        }
      `}
    >
      <span className="flex items-center">{icon}</span>

      <span>{label}</span>
    </button>
  );
};

export default SidebarItem;
