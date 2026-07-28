import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        "flex h-11 w-full max-w-md items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-4",
        className,
      )}
    >
      <Search size={18} className="text-[#9CA3AF]" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-transparent text-sm outline-none placeholder:text-[#9CA3AF]",
        )}
      />
    </div>
  );
};

export default SearchBar;
