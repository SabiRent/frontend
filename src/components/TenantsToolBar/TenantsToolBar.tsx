import { Bell, Plus } from "lucide-react";

import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/Button/Button";
import { useState } from "react";

const TenantsToolbar = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Active", "Inactive", "Pending"];

  return (
    <div className="space-y-6 pt-4 sm:pt-6">
      {/* Top Row */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">
        <Button
          variant="outline"
          className="h-11 flex-1 rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F5FCFD] sm:w-[163px] sm:flex-none"
        >
          <Plus size={18} className="mr-2" />
          Add Tenant
        </Button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white hover:bg-gray-50">
          <Bell size={18} />

          <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full rounded-lg border-[#A8ABAB] bg-white sm:w-[354px]">
          <SearchBar placeholder="Search tenant" />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:gap-5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`h-[40px] shrink-0 rounded-lg px-5 text-sm font-medium transition sm:px-6
        ${
          activeFilter === filter
            ? "bg-[#167589] text-white"
            : "border border-[#EAECF0] bg-white text-[#344054] hover:bg-[#F9FAFB]"
        }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantsToolbar;
