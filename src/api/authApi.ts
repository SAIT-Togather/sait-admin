import axiosInstance from "./axiosInstance";

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  loginId: string;
  name: string;
  role: "USER" | "ADMIN";
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export const adminLogin = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/api/admin/auth/login",
    request
  );

  return response.data.data;
};