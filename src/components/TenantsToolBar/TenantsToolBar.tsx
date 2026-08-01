import { Plus } from "lucide-react";
import { useState } from "react";

import AddTenantModal from "@/components/forms/AddTenantModal";
import { Button } from "@/components/Button/Button";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import type { TenantStatus } from "@/services/api/types";

interface TenantsToolbarProps {
  search: string;
  status?: TenantStatus;
  onSearchChange: (value: string) => void;
  onStatusChange: (status?: TenantStatus) => void;
}

const filters: Array<{ label: string; value?: TenantStatus }> = [
  { label: "All" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
];

const TenantsToolbar = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TenantsToolbarProps) => {
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const activeFilter = status ?? "all";

  return (
    <>
      <div className="space-y-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-lg border-[#167589] bg-white text-[#167589] hover:bg-[#F5FCFD] sm:w-[163px] sm:flex-none"
            onClick={() => setIsAddTenantOpen(true)}
          >
            <Plus size={18} className="mr-2" />
            Add Tenant
          </Button>
          <NotificationButton />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full rounded-lg bg-white sm:w-[354px]">
            <SearchBar
              placeholder="Search tenant"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:gap-5">
            {filters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => onStatusChange(filter.value)}
                className={`h-[40px] shrink-0 rounded-lg px-5 text-sm font-medium transition sm:px-6 ${
                  activeFilter === (filter.value ?? "all")
                    ? "bg-[#167589] text-white"
                    : "border border-[#EAECF0] bg-white text-[#344054] hover:bg-[#F9FAFB]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AddTenantModal
        open={isAddTenantOpen}
        onOpenChange={setIsAddTenantOpen}
      />
    </>
  );
};

export default TenantsToolbar;
