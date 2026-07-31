import { DEFAULT_LIMIT } from "@/constants/pagination";
import { apiClient } from "@/services/api/client";
import type { ApiMessageResponse, ApiResponse } from "@/services/api/types";

export type NotificationCategory =
  | "payments"
  | "properties"
  | "tenants"
  | "maintenance";

export interface NotificationItem {
  id: string;
  category: NotificationCategory;
  title: string;
  subtitle: string;
  message: string;
  isRead: boolean;
  readAt: string | null;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NotificationQuery {
  page?: number;
  limit?: number;
  category?: NotificationCategory;
  isRead?: boolean;
}

export interface NotificationListResponse {
  success: boolean;
  notifications: NotificationItem[];
  pagination: NotificationPagination;
}

export interface UnreadNotificationCount {
  count: number;
}

export interface MarkAllNotificationsReadData {
  updated: number;
}

export async function fetchNotifications(
  params: NotificationQuery = {},
): Promise<NotificationListResponse> {
  const { data } = await apiClient.get<NotificationListResponse>(
    "/notifications",
    {
      params: {
        page: 1,
        limit: DEFAULT_LIMIT,
        ...params,
      },
    },
  );

  return data;
}

export async function fetchUnreadNotificationCount(): Promise<number> {
  const { data } = await apiClient.get<ApiResponse<UnreadNotificationCount>>(
    "/notifications/unread-count",
  );

  return data.data.count;
}

export async function markAllNotificationsAsRead(): Promise<
  ApiResponse<MarkAllNotificationsReadData>
> {
  const { data } =
    await apiClient.patch<ApiResponse<MarkAllNotificationsReadData>>(
      "/notifications/read-all",
    );

  return data;
}

export async function markNotificationAsRead(
  id: string,
): Promise<NotificationItem> {
  const { data } = await apiClient.patch<ApiResponse<NotificationItem>>(
    `/notifications/${id}/read`,
  );

  return data.data;
}

export async function deleteNotification(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await apiClient.delete<ApiMessageResponse>(
    `/notifications/${id}`,
  );

  return data;
}
