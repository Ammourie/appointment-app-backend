// src/common/interfaces/api-response.interface.ts
export interface ApiResponse<T> {
  success: boolean;
  result: T | null;
  error: {
    errorCode: number;
    errorMessage: string;
  } | null;
}
