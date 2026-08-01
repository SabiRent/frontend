import { ArrowUpDown, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/Button/Button";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import SearchBar from "@/components/SearchBar/SearchBar";

interface PropertiesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const PropertiesToolbar = ({
  search,
  onSearchChange,
}: PropertiesToolbarProps) => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  return (
    <>
      <div className="space-y-5">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold text-[#000000]">Properties</h1>

          <p className="mt-1 text-sm text-[#5A5C5E]">
            Manage all your properties in one place
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
            <div className="w-full sm:w-[420px]">
              <SearchBar
                placeholder="Search properties by name or address"
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

          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-10 flex-1 rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD] sm:w-[173px] sm:flex-none"
              onClick={() => setIsAddPropertyOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Add Property
            </Button>

            <NotificationButton />
          </div>
        </div>
      </div>

      <AddPropertyModal
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
      />
    </>
  );
};

export default PropertiesToolbar;
