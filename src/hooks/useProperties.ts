import { useQuery } from "@tanstack/react-query";

import {
  fetchProperties,
  type PropertyQuery,
} from "@/services/api/property.service";

export function useProperties(params: PropertyQuery = {}) {
  return useQuery({
    queryKey: ["properties", params],
    queryFn: () => fetchProperties(params),
  });
}
