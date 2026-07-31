import { DEFAULT_LIMIT } from "@/constants/pagination";
import { apiClient } from "@/services/api/client";
import type {
  ApiMessageResponse,
  ApiResponse,
  Unit,
  UnitListResponse,
  OccupancyStatus,
} from "@/services/api/types";

export interface UnitQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateUnitPayload {
  property: string;
  name: string;
  occupancyStatus: OccupancyStatus;
}

export async function fetchUnits(
  params: UnitQuery = {},
): Promise<UnitListResponse> {
  const { data } = await apiClient.get<UnitListResponse>("/units", {
    params: {
      page: 1,
      limit: DEFAULT_LIMIT,
      ...params,
    },
  });

  return data;
}

export async function createUnit(payload: CreateUnitPayload): Promise<Unit> {
  const { data } = await apiClient.post<ApiResponse<Unit>>("/units", payload);

  return data.data;
}

export async function updateUnit({
  id,
  payload,
}: {
  id: string;
  payload: CreateUnitPayload;
}): Promise<Unit> {
  const { data } = await apiClient.patch<ApiResponse<Unit>>(
    `/units/${id}`,
    payload,
  );

  return data.data;
}

export async function deleteUnit(id: string): Promise<ApiMessageResponse> {
  const { data } = await apiClient.delete<ApiMessageResponse>(`/units/${id}`);

  return data;
}
