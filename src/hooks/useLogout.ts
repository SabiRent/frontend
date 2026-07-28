import { useMutation } from "@tanstack/react-query";

import { apiClient } from "@/services/api/client";
import type { ApiMessageResponse } from "@/services/api/types";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<ApiMessageResponse>("/auth/logout");

      return data;
    },
  });
}
