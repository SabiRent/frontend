import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

import SearchBar from "@/components/SearchBar/SearchBar";
import NotificationButton from "@/components/NotificationButton/NotificationButton";
import ActionButton from "@/components/ActionButton/ActionButton";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-white px-6 py-4">
      <div className="max-w-md flex-1">
        <SearchBar />
      </div>

      <div className="flex items-center gap-3">
        <ActionButton icon={<SlidersHorizontal size={18} />} label="Filter" />

        <ActionButton icon={<ArrowUpDown size={18} />} label="Sort" />

        <NotificationButton />
      </div>
    </header>
  );
};

export default DashboardHeader;
