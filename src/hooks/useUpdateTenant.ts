import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTenant } from "@/services/api/tenant.service";

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTenant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tenants"] }),
  });
}
