import { Bell, Plus, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/Button/Button";

const PropertiesToolbar = () => {
  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-[#000000]">Properties</h1>

        <p className="mt-1 text-sm text-[#5A5C5E]">
          Manage all your properties in one place
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-[420px]">
            <SearchBar placeholder="Search properties by name or address" />
          </div>

          <button className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]">
            <SlidersHorizontal size={16} className="text-[#667085]" />
          </button>

          <button className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]">
            <ArrowUpDown size={16} className="text-[#667085]" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="h-[34px] w-[173px] rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD]"
          >
            <Plus size={18} className="mr-2" />
            Add Property
          </Button>

          <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white">
            <Bell size={18} />

            <span className="absolute right-3 top-2.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesToolbar;
