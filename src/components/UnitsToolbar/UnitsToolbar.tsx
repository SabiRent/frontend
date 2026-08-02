import { ArrowUpDown, Plus, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button/Button";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomTooltip from "@/components/CustomTooltip/CustomTooltip";
import AddUnitModal from "@/components/forms/AddUnitModal";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useProperties } from "@/hooks/useProperties";
import type { OccupancyStatus } from "@/services/api/types";
import type { SortOrder, UnitSortBy } from "@/services/api/unit.service";

interface UnitsToolbarProps {
  search: string;
  property?: string;
  occupancyStatus?: OccupancyStatus;
  sortBy: UnitSortBy;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: {
    property?: string;
    occupancyStatus?: OccupancyStatus;
  }) => void;
  onSortChange: (sortBy: UnitSortBy, sortOrder: SortOrder) => void;
}

const sortOptions: Array<{
  label: string;
  sortBy: UnitSortBy;
  sortOrder: SortOrder;
}> = [
  { label: "Recently added", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Unit name: A–Z", sortBy: "name", sortOrder: "asc" },
  { label: "Unit name: Z–A", sortBy: "name", sortOrder: "desc" },
];

const UnitsToolbar = ({
  search,
  property,
  occupancyStatus,
  sortBy,
  sortOrder,
  onSearchChange,
  onFilterChange,
  onSortChange,
}: UnitsToolbarProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const { data: propertyData, isLoading: arePropertiesLoading } = useProperties(
    {
      limit: 100,
    },
  );
  const hasActiveFilters = Boolean(property || occupancyStatus);
  const propertyOptions = (propertyData?.properties ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  useEffect(() => {
    if (!showFilter && !showSort) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setShowFilter(false);
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showFilter, showSort]);

  return (
    <>
      <div className="flex flex-col gap-4 pt-6 pr-10 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="w-full sm:w-[420px]">
            <SearchBar
              placeholder="Search units by name or address"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>

          <div ref={controlsRef} className="flex items-center gap-3">
            <div className="relative">
              <CustomTooltip content="Filter units">
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Filter units"
                  onClick={() => {
                    setShowFilter((current) => !current);
                    setShowSort(false);
                  }}
                  className="relative h-10 gap-2 rounded-lg border-[#D0D5DD] bg-white px-3 hover:bg-[#F9FAFB]"
                >
                  <SlidersHorizontal size={16} className="text-[#667085]" />
                  <span className="hidden text-sm text-[#344054] sm:inline">
                    Filter
                  </span>
                  {hasActiveFilters && (
                    <span className="h-2 w-2 rounded-full bg-[#167589]" />
                  )}
                </Button>
              </CustomTooltip>

              {showFilter && (
                <div className="absolute left-0 top-12 z-50 w-72 rounded-xl border border-[#EAECF0] bg-white p-4 shadow-lg">
                  <p className="pb-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                    Filter units
                  </p>
                  <div className="space-y-4">
                    <CustomSelect
                      label="Property"
                      placeholder={
                        arePropertiesLoading
                          ? "Loading properties..."
                          : "All properties"
                      }
                      options={propertyOptions}
                      value={property ?? ""}
                      onValueChange={(value) =>
                        onFilterChange({
                          property: value || undefined,
                          occupancyStatus,
                        })
                      }
                      disabled={arePropertiesLoading}
                    />
                    <CustomSelect
                      label="Occupancy status"
                      placeholder="All statuses"
                      options={[
                        { label: "Vacant", value: "vacant" },
                        { label: "Occupied", value: "occupied" },
                      ]}
                      value={occupancyStatus ?? ""}
                      onValueChange={(value) =>
                        onFilterChange({
                          property,
                          occupancyStatus: (value || undefined) as
                            OccupancyStatus | undefined,
                        })
                      }
                    />
                  </div>
                  {hasActiveFilters && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="mt-3 w-full text-[#167589]"
                      onClick={() => onFilterChange({})}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <CustomTooltip content="Sort units">
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Sort units"
                  onClick={() => {
                    setShowSort((current) => !current);
                    setShowFilter(false);
                  }}
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
                    Sort units
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
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            type="button"
            className="h-[34px] w-[173px] rounded-lg border-[#167589] bg-white text-[#167589] hover:bg-[#F7FCFD]"
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
