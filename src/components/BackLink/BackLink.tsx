import { ChevronLeft } from "lucide-react";

interface BackLinkProps {
  title: string;
  onBack?: () => void;
}

/** "< Reset Password" header used across the reset-password steps. */
export function BackLink({ title, onBack }: BackLinkProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-1.5 text-[#1F2937] font-semibold mb-6 hover:opacity-80 transition-opacity"
    >
      <ChevronLeft className="h-4 w-4" />
      {title}
    </button>
  );
}
