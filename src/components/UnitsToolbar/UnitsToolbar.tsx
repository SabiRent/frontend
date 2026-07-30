import { Bell, Plus, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/Button/Button";

const UnitsToolbar = () => {
  return (
    <div className="flex flex-col gap-4 pt-4 sm:pt-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-5">
        <div className="w-full sm:w-[420px]">
          <SearchBar placeholder="Search units by name or address" />
        </div>
        <button className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]">
          <SlidersHorizontal size={16} className="text-[#667085]" />
        </button>

        <button className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]">
          <ArrowUpDown size={16} className="text-[#667085]" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          className="h-10 flex-1 rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD] sm:w-[173px] sm:flex-none"
        >
          <Plus size={18} className="mr-2" />
          Add Unit
        </Button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
};

export default UnitsToolbar;
