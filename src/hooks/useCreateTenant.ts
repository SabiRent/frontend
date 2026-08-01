import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTenant } from "@/services/api/tenant.service";

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTenant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tenants"] }),
  });
}
