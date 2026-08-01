import { useQuery } from "@tanstack/react-query";

import { fetchTenants, type TenantQuery } from "@/services/api/tenant.service";

export function useTenants(params: TenantQuery = {}) {
  return useQuery({
    queryKey: ["tenants", params],
    queryFn: () => fetchTenants(params),
  });
}
