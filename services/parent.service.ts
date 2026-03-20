import axiosInstance from "@/lib/axios";

// Types
export interface UpdateParentRequest {
  parent_name: string;
}

export interface UpdateParentResponse {
  parent_id: string;
  parent_name: string;
  email: string;
  onboarding_status: string;
  created_at: string;
}

// API Call
export const updateParent = async (
  data: UpdateParentRequest,
): Promise<UpdateParentResponse> => {
  const response = await axiosInstance.patch<UpdateParentResponse>(
    "/parent/me",
    data,
  );
  return response.data;
};
