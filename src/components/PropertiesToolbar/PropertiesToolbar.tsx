import { ArrowUpDown, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button/Button";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import AddPropertyModal from "@/components/forms/AddPropertyModal";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import type {
  PropertySortBy,
  SortOrder,
} from "@/services/api/property.service";

interface PropertiesToolbarProps {
  search: string;
  sortBy: PropertySortBy;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onSortChange: (sortBy: PropertySortBy, sortOrder: SortOrder) => void;
}

const sortOptions: Array<{
  label: string;
  sortBy: PropertySortBy;
  sortOrder: SortOrder;
}> = [
  { label: "Recently added", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Property name: A–Z", sortBy: "name", sortOrder: "asc" },
  { label: "Property name: Z–A", sortBy: "name", sortOrder: "desc" },
  { label: "Most units", sortBy: "unitCount", sortOrder: "desc" },
  { label: "Least units", sortBy: "unitCount", sortOrder: "asc" },
];

const PropertiesToolbar = ({
  search,
  sortBy,
  sortOrder,
  onSearchChange,
  onSortChange,
}: PropertiesToolbarProps) => {
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showSort) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showSort]);

  return (
    <>
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-semibold text-[#000000]">Properties</h1>
          <p className="mt-1 text-sm text-[#5A5C5E]">
            Manage all your properties in one place
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
            <div className="w-full sm:w-[420px]">
              <SearchBar
                placeholder="Search properties by name or address"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </div>

            <div ref={sortRef} className="relative">
              <CustomTooltip content="Sort properties">
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Sort properties"
                  onClick={() => setShowSort((current) => !current)}
                  className="h-10 gap-2 rounded-lg border-[#D0D5DD] bg-white px-3 hover:bg-[#F9FAFB]"
                >
                  <ArrowUpDown size={16} className="text-[#667085]" />
                  <span className="hidden text-sm text-[#344054] sm:inline">
                    Sort
                  </span>
                </Button>
              </CustomTooltip>

              {showSort && (
                <div className="absolute left-0 top-12 z-50 w-64 rounded-xl border border-[#EAECF0] bg-white p-3 shadow-lg">
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                    Sort properties
                  </p>
                  {sortOptions.map((option) => {
                    const isActive =
                      option.sortBy === sortBy &&
                      option.sortOrder === sortOrder;

                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                          onSortChange(option.sortBy, option.sortOrder);
                          setShowSort(false);
                        }}
                        className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          isActive
                            ? "bg-[#E8F5F7] font-semibold text-[#167589]"
                            : "text-[#344054] hover:bg-[#F9FAFB]"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-10 flex-1 rounded-lg border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD] sm:w-[173px] sm:flex-none"
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
