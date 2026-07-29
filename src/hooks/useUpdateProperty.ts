import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProperty } from "@/services/api/property.service";

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateProperty(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}
