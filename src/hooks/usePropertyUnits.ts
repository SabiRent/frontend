import { useQuery } from "@tanstack/react-query";

import { fetchPropertyUnits } from "@/services/api/property.service";

export function usePropertyUnits(propertyId?: string) {
  return useQuery({
    queryKey: ["property-units", propertyId],
    queryFn: () => fetchPropertyUnits(propertyId as string),
    enabled: Boolean(propertyId),
  });
}
