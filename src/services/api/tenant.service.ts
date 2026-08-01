import { DEFAULT_LIMIT } from "@/constants/pagination";
import { apiClient } from "@/services/api/client";
import type {
  ApiMessageResponse,
  ApiResponse,
  PaymentFrequency,
  Tenant,
  TenantListResponse,
  TenantStatus,
} from "@/services/api/types";

export interface TenantQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: TenantStatus;
}

export interface TenantPayload {
  unit: string;
  fullName: string;
  phone: string;
  email?: string;
  rentAmount: number;
  paymentFrequency: PaymentFrequency;
  lastPaymentDate: string;
  status: TenantStatus;
}

export async function fetchTenants(
  params: TenantQuery = {},
): Promise<TenantListResponse> {
  const { data } = await apiClient.get<TenantListResponse>("/tenants", {
    params: { page: 1, limit: DEFAULT_LIMIT, ...params },
  });

  return data;
}

export async function createTenant(payload: TenantPayload): Promise<Tenant> {
  const { data } = await apiClient.post<ApiResponse<Tenant>>(
    "/tenants",
    payload,
  );
  return data.data;
}

export async function updateTenant({
  id,
  payload,
}: {
  id: string;
  payload: TenantPayload;
}): Promise<Tenant> {
  const { data } = await apiClient.patch<ApiResponse<Tenant>>(
    `/tenants/${id}`,
    payload,
  );
  return data.data;
}

export async function deleteTenant(id: string): Promise<ApiMessageResponse> {
  const { data } = await apiClient.delete<ApiMessageResponse>(`/tenants/${id}`);
  return data;
}
