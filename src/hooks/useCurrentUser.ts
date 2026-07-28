import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/services/api/client";
import type { ApiResponse, CurrentUser } from "@/services/api/types";
import { useAuthStore } from "@/stores/authStore";

type CurrentUserResponse = ApiResponse<CurrentUser>;

export function useCurrentUser() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["current-user"],
    enabled: Boolean(accessToken),
    queryFn: async () => {
      const { data } = await apiClient.get<CurrentUserResponse>("/users/me");
      useAuthStore.getState().setUser(data.data);
      return data.data;
    },
  });
}
