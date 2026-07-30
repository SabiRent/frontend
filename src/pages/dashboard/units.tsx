import { useState } from "react";

import Pagination from "@/components/Pagination/Pagination";
import UnitsToolbar from "@/components/UnitsToolbar/UnitsToolbar";
import UnitTable from "@/components/UnitTable/UnitTable";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { useUnits } from "@/hooks/useUnits";

const Units = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search.trim());
  const { data, isLoading, isError } = useUnits({
    page,
    limit: DEFAULT_LIMIT,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  });

  return (
    <div className="space-y-8">
      <UnitsToolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <h2 className="text-[24px] font-semibold text-[#000000]">Total units</h2>

      <div className="-mr-10">
        {isLoading && (
          <p className="py-10 text-center text-sm text-[#667085]">
            Loading units...
          </p>
        )}
        {isError && (
          <p className="py-10 text-center text-sm text-red-600">
            We could not load your units. Please try again.
          </p>
        )}
        {!isLoading && !isError && <UnitTable units={data?.units ?? []} />}
      </div>

      <Pagination
        page={data?.pagination.page ?? page}
        totalPages={data?.pagination.totalPages ?? 1}
        total={data?.pagination.total ?? 0}
        limit={DEFAULT_LIMIT}
        itemLabel="units"
        onPageChange={setPage}
      />
    </div>
  );
};

export default Units;
