import { DEFAULT_LIMIT } from "@/constants/pagination";
import { apiClient } from "@/services/api/client";
import type {
  ApiMessageResponse,
  ApiResponse,
  Property,
  PropertyListResponse,
  UnitListResponse,
} from "@/services/api/types";

export async function fetchPropertyUnits(
  propertyId: string,
): Promise<UnitListResponse> {
  const { data } = await apiClient.get<UnitListResponse>(
    `/properties/${propertyId}/units`,
  );

  return data;
}

export interface PropertyQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "createdAt" | "unitCount";
  sortOrder?: "asc" | "desc";
}

export async function fetchProperties(
  params: PropertyQuery = {},
): Promise<PropertyListResponse> {
  const { data } = await apiClient.get<PropertyListResponse>("/properties", {
    params: {
      page: 1,
      limit: DEFAULT_LIMIT,
      ...params,
    },
  });

  return data;
}

export async function fetchPropertyById(id: string): Promise<Property> {
  const { data } = await apiClient.get<ApiResponse<Property>>(
    `/properties/${id}`,
  );

  return data.data;
}

export async function createProperty(formData: FormData): Promise<Property> {
  const { data } = await apiClient.post<ApiResponse<Property>>(
    "/properties",
    formData,
  );

  return data.data;
}

export async function updateProperty(
  id: string,
  formData: FormData,
): Promise<Property> {
  const { data } = await apiClient.patch<ApiResponse<Property>>(
    `/properties/${id}`,
    formData,
  );

  return data.data;
}

export async function deleteProperty(id: string): Promise<ApiMessageResponse> {
  const { data } = await apiClient.delete<ApiMessageResponse>(
    `/properties/${id}`,
  );

  return data;
}
