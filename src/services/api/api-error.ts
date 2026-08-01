import axios from "axios";

interface ApiErrorResponse {
  message?: string;
  error?: { message?: string };
  errors?: Record<string, string>;
}

export function getApiErrorDetails(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response?.data;

    return {
      message: response?.error?.message ?? response?.message,
      fieldErrors: response?.errors ?? {},
    };
  }

  return {
    message: error instanceof Error ? error.message : undefined,
    fieldErrors: {},
  };
}
