import { API_BASE_URL } from "@/config";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || "error: " + error.message,
    );
    if (error.response?.status === 401) {
      // e.g. redirect to login, clear token, etc.
    }
    return Promise.reject(error);
  },
);
