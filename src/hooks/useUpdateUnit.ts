import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUnit } from "@/services/api/unit.service";

export function useUpdateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}
