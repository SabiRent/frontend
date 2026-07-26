import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { LoginForm } from "@/validations/auth";

interface LoginData {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

type LoginResponse = ApiResponse<LoginData>;

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
