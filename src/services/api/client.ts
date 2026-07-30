import { API_BASE_URL } from "@/config";
import { AppRoutes } from "@/constants/routes";
import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import type { RefreshTokenResponse } from "@/services/api/types";
import { useAuthStore } from "@/stores/authStore";

type AuthRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _skipAuthRefresh?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const authConfig = config as AuthRequestConfig;
  const token = useAuthStore.getState().accessToken;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  if (token && !authConfig._skipAuthRefresh) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const clearAuth = () => {
  useAuthStore.getState().clearAuth();
};

const redirectToLogin = () => {
  if (
    typeof window !== "undefined" &&
    window.location.pathname !== AppRoutes.login
  ) {
    window.location.assign(AppRoutes.login);
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = apiClient
      .request<RefreshTokenResponse>({
        method: "POST",
        url: "/auth/refresh",
        _skipAuthRefresh: true,
      } as AxiosRequestConfig & { _skipAuthRefresh: boolean })
      .then(({ data }) => {
        useAuthStore.getState().setAuth(data.data.accessToken, data.data.user);

        return data.data.accessToken;
      })
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      "API Error:",
      error.response?.data || "error: " + error.message,
    );

    const config = error.config as AuthRequestConfig | undefined;
    const isAuthRequest = config?.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      config &&
      !config._retry &&
      !config._skipAuthRefresh &&
      !isAuthRequest
    ) {
      config._retry = true;

      const accessToken = await refreshAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(config);
      }

      clearAuth();
      redirectToLogin();
    }

    return Promise.reject(error);
  },
);
