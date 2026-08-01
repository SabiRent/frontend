import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTenant } from "@/services/api/tenant.service";

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tenants"] }),
  });
}
