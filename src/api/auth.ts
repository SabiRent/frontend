import api from "./axios";

export interface ApiResponse {
  success: boolean;
  message: string;
}

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>("/api/v1/auth/forgot-password", {
    email,
  });

  return data;
};

export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>("/api/v1/auth/reset-password", {
    token,
    newPassword,
  });

  return data;
};
