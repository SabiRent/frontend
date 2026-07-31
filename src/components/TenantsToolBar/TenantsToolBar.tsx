import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router";

import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/Button/Button";

interface TenantsToolbarProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onAddTenant: () => void;
}
const TenantsToolbar = ({
  selectedStatus,
  onStatusChange,
  onAddTenant,
}: TenantsToolbarProps) => {
  const navigate = useNavigate();
  const statuses = ["All", "Active", "Inactive", "Pending"];

  return (
    <div className="space-y-6 pt-4 sm:pt-6">
      {/* Top Row */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">
        <Button
          variant="outline"
          onClick={onAddTenant}
          className="h-[48px] w-[163px] rounded-lg border border-[#167589] bg-white text-[#167589] hover:bg-[#F5FCFD]"
        >
          <Plus size={18} className="mr-2" />
          Add Tenant
        </Button>

        <button
          onClick={() => navigate("/dashboard/notifications")}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white hover:bg-gray-50"
        >
          <Bell size={18} />
          <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full rounded-lg border-[#A8ABAB] bg-white sm:w-[354px]">
          <SearchBar placeholder="Search tenant" />
        </div>

        <div className="flex items-center gap-5 ">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`h-[40px] rounded-lg px-6 text-sm font-medium transition
        ${
          selectedStatus === status
            ? "bg-[#167589] text-white"
            : "border border-[#EAECF0] bg-white text-[#344054] hover:bg-[#F9FAFB]"
        }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantsToolbar;
