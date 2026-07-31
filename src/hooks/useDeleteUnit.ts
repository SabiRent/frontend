import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUnit } from "@/services/api/unit.service";

export function useDeleteUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}
