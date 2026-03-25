import axiosInstance from "@/lib/axios";

// Types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  parent_id: string;
  onboarding_status: "completed" | "pending";
}

export const authenticateParent = async (
  data: AuthRequest,
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/parent/authenticate",
    data,
  );
  return response.data;
};

export const completeOnboarding = async (): Promise<void> => {
  await axiosInstance.post("/auth/parent/onboarding/complete");
};
