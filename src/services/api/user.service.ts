import { apiClient } from "@/services/api/client";
import type { ApiResponse, CurrentUser } from "@/services/api/types";

export async function uploadUserAvatar(file: File): Promise<CurrentUser> {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await apiClient.patch<ApiResponse<CurrentUser>>(
    "/users/me/avatar",
    formData,
  );

  return data.data;
}
