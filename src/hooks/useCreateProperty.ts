import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProperty } from "@/services/api/property.service";

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}
