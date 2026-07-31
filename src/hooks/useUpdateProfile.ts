import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/services/api/client";
import type { ApiResponse, CurrentUser } from "@/services/api/types";
import { useAuthStore } from "@/stores/authStore";

export interface UpdateProfileInput {
  fullName: string;
}

type UpdateProfileResponse = ApiResponse<CurrentUser>;

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProfileInput) => {
      const { data } = await apiClient.patch<UpdateProfileResponse>(
        "/users/me",
        input,
      );

      return data;
    },
    onSuccess: ({ data }) => {
      useAuthStore.getState().setUser(data);
      queryClient.setQueryData(["current-user"], data);
    },
  });
}
