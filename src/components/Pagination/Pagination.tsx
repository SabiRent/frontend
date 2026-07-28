import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  return (
    <div className="mt-6 flex items-center justify-between">
      {/* Left */}
      <p className="text-sm text-[#667085]">Showing 1 to 6 of 6 properties</p>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Previous */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB]">
          <ChevronLeft size={18} />
        </button>

        {/* Current page */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#167589] font-semibold text-white">
          1
        </button>

        {/* Next */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB]">
          <ChevronRight size={18} />
        </button>

        {/* Page size */}
        <select className="h-10 rounded-lg border border-[#D0D5DD] bg-white px-3 text-sm text-[#344054] outline-none">
          <option>10 / Page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
