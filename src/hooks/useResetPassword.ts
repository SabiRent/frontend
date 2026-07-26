import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";

interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (input: ResetPasswordInput) => {
      const { data } = await apiClient.post("/auth/reset-password", input);

      return data;
    },
  });
}
