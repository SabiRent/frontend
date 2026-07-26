import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { SignupForm } from "@/validations/auth";

interface SignupData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

type SignupResponse = ApiResponse<SignupData>;

export function useSignup() {
  return useMutation({
    mutationFn: async (input: SignupForm) => {
      const payload = {
        fullName: input.fullName,
        email: input.email,
        password: input.password,
      };
      const { data } = await apiClient.post<SignupResponse>(
        "/auth/signup",
        payload,
      );

      return data;
    },
  });
}
