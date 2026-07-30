import { Bell, Plus, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/Button/Button";

const UnitsToolbar = () => {
  return (
    <div className="flex items-center justify-between pt-6 pr-10">
      {/* Left */}
      <div className="flex items-center gap-5">
        <div className="w-[420px]">
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
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="h-[34px] w-[173px] rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD]"
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
