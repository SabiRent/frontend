import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProperty } from "@/services/api/property.service";

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}
