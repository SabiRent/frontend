import { ArrowUpDown, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/Button/Button";
import AddUnitModal from "@/components/forms/AddUnitModal";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import SearchBar from "@/components/SearchBar/SearchBar";

interface UnitsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const UnitsToolbar = ({ search, onSearchChange }: UnitsToolbarProps) => {
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between pt-6 pr-10">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="w-[420px]">
            <SearchBar
              placeholder="Search units by name or address"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
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
            type="button"
            className="h-[34px] w-[173px] rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD]"
            onClick={() => setIsAddUnitOpen(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Unit
          </Button>

          <NotificationButton />
        </div>
      </div>

      <AddUnitModal open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen} />
    </>
  );
};

export default UnitsToolbar;
