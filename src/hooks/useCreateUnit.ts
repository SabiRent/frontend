import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUnit } from "@/services/api/unit.service";

export function useCreateUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });
}
