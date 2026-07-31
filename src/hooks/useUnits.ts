import { useQuery } from "@tanstack/react-query";

import { fetchUnits, type UnitQuery } from "@/services/api/unit.service";

export function useUnits(params: UnitQuery = {}) {
  return useQuery({
    queryKey: ["units", params],
    queryFn: () => fetchUnits(params),
  });
}
