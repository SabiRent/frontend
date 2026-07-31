import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  itemLabel = "properties",
  onPageChange,
}: PaginationProps) => {
  const firstItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const lastItem = Math.min(page * limit, total);

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <p className="text-sm text-[#667085]">
        Showing {firstItem} to {lastItem} of {total} {itemLabel}
      </p>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Previous */}
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Current page */}
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#167589] font-semibold text-white">
          {page}
        </button>

        {/* Next */}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
