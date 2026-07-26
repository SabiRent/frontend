import axios from "axios";

export function getApiErrorCode(error: unknown): string | undefined {
  if (!axios.isAxiosError(error)) return undefined;

  const responseData = error.response?.data;
  if (!responseData || typeof responseData !== "object") return undefined;

  const data = responseData as Record<string, unknown>;
  const nestedError = data.error;

  if (typeof data.code === "string") return data.code;
  if (typeof data.errorCode === "string") return data.errorCode;

  if (nestedError && typeof nestedError === "object") {
    const errorData = nestedError as Record<string, unknown>;
    if (typeof errorData.code === "string") return errorData.code;
  }

  return undefined;
}
