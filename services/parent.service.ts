import axiosInstance from "@/lib/axios";

// Types
export interface UpdateParentRequest {
  parent_name?: string;
  phone_number?: string;
  gender?: string;
  current_password?: string;
  new_password?: string;
}

export interface ParentProfile {
  parent_id: string;
  parent_name: string;
  email: string;
  onboarding_status: "completed" | "pending";
  created_at: string;
}

export type UpdateParentResponse = ParentProfile;

// API Calls
export const getParentProfile = async (): Promise<ParentProfile> => {
  const response = await axiosInstance.get<ParentProfile>("/parent/me");
  return response.data;
};

export const updateParent = async (
  data: UpdateParentRequest,
): Promise<UpdateParentResponse> => {
  const response = await axiosInstance.patch<UpdateParentResponse>(
    "/parent/me",
    data,
  );
  return response.data;
};
