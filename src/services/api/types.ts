export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
