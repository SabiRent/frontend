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
