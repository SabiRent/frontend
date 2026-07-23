import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  showChevron?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  showChevron = true,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#374151] transition hover:bg-gray-50"
    >
      {icon}

      <span>{label}</span>

      {showChevron && <ChevronDown size={16} className="text-[#6B7280]" />}
    </button>
  );
};

export default ActionButton;
