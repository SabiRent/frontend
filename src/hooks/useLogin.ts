import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse, AuthTokenData } from "@/services/api/types";
import type { LoginForm } from "@/validations/auth";

type LoginResponse = ApiResponse<AuthTokenData>;

export function useLogin() {
  return useMutation({
    mutationFn: async (input: LoginForm) => {
      const { data } = await apiClient.post<LoginResponse>(
        "/auth/login",
        input,
      );

      return data;
    },
  });
}
