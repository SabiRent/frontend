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
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
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
        <div className="relative">
          <button
            onClick={() => {
              setShowFilter(!showFilter);
              setShowSort(false);
            }}
            className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal
              size={16}
              className="text-[#667085]"
            />
          </button>

          {showFilter && (
            <div className="absolute left-0 top-12 z-50 w-[263px] rounded-xl bg-white py-3 shadow-lg">
              <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                Property Name
              </button>

              <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                Occupancy Status
              </button>

              <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                Tenant Name
              </button>

              <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                Active
              </button>

              <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                Inactive
              </button>
            </div>
          )}
        </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="flex h-10 w-13 items-center justify-center rounded-full border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB]"
            >
              <ArrowUpDown
                size={16}
                className="text-[#667085]"
              />
            </button>

            {showSort && (
              <div className="absolute left-0 top-12 z-50 w-[263px] rounded-xl bg-white py-3 shadow-lg">
                <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                  Recently Added
                </button>

                <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                  Property Name (A-Z)
                </button>

                <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                  Property Name (Z-A)
                </button>

                <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                  Most Units
                </button>

                <button className="block w-full px-6 py-3 text-center hover:bg-gray-50 text-[#031316] font-semibold">
                  Least Units
                </button>
              </div>
            )}
          </div>
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
