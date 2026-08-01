export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export interface AuthUser {
  id: string;
  fullName?: string;
  email: string;
  role: string;
  isActive?: boolean;
  avatarUrl?: string | null;
  createdAt?: string;
}

export interface CurrentUser extends AuthUser {
  fullName: string;
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AuthTokenData {
  accessToken: string;
  user: AuthUser;
}

export type RefreshTokenResponse = ApiResponse<AuthTokenData>;

export interface Property {
  id: string;
  owner: string;
  name: string;
  address: {
    street: string;
    city: string;
    state?: string;
    country?: string;
  };
  unitCount: number;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PropertyListResponse {
  success: true;
  properties: Property[];
  pagination: PropertyPagination;
}

export type OccupancyStatus = "vacant" | "occupied";
export type RentInterval = "yearly" | "monthly";

export interface Unit {
  id: string;
  property: {
    id: string;
    name: string;
  };
  name: string;
  occupancyStatus: OccupancyStatus;
  rentAmount: number;
  rentInterval: RentInterval;
  createdAt: string;
  updatedAt: string;
}

export interface UnitPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UnitListResponse {
  success: true;
  units: Unit[];
  pagination: UnitPagination;
}

export type PaymentFrequency = "yearly" | "quarterly" | "monthly";
export type TenantStatus = "active" | "inactive" | "pending";

export interface Tenant {
  id: string;
  unit: Unit;
  fullName: string;
  phone: string;
  email?: string;
  rentAmount: number;
  paymentFrequency: PaymentFrequency;
  lastPaymentDate: string;
  nextDueDate: string;
  status: TenantStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TenantPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TenantListResponse {
  success: true;
  tenants: Tenant[];
  pagination: TenantPagination;
}
