import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";

interface ForgotPasswordInput {
  email: string;
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (input: ForgotPasswordInput) => {
      const { data } = await apiClient.post("/auth/forgot-password", input);

      return data;
    },
  });
}
