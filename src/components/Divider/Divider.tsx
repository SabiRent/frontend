interface DividerProps {
  label?: string;
}

/** Dashed "or" divider between the primary action and social auth buttons. */
export function Divider({ label = "or" }: DividerProps) {
  return (
    <div className="flex items-center gap-3 my-1">
      <span className="flex-1 border-t border-dashed border-[#D1D5DB]" />
      <span className="text-xs text-[#9CA3AF]">{label}</span>
      <span className="flex-1 border-t border-dashed border-[#D1D5DB]" />
    </div>
  );
}
