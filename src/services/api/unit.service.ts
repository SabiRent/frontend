import { DEFAULT_LIMIT } from "@/constants/pagination";
import { apiClient } from "@/services/api/client";
import type {
  ApiResponse,
  Unit,
  UnitListResponse,
  OccupancyStatus,
  RentInterval,
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
  rentAmount: number;
  rentInterval: RentInterval;
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
