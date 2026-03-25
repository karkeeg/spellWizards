import axiosInstance from "@/lib/axios";

export interface ChildProfileItem {
  name: string;
  email: string;
  age: number;
  class_name: string;
  current_spelling_level: string;
  interests: string[];
  password?: string;
  avatar_url?: string;
}

export interface BatchCreateChildrenRequest {
  children: ChildProfileItem[];
}

export interface ChildProfileResponse {
  child_id: string;
  parent_id: string;
  name: string;
  email: string;
  class_name: string;
  avatar_url: string;
  age: number;
  current_spelling_level: string;
  interests: string[];
  onboarding_status: string;
  current_level: number;
  xp: number;
  streak_days: number;
  created_at: string;
  invite_code: string;
  full_name?: string | null;
  display_name?: string | null;
  phone_number?: string | null;
  gender?: string | null;
  address?: string | null;
  school?: string | null;
  school_address?: string | null;
  section?: string | null;
  grade_band?: string | null;
}

export const createChildren = async (
  data: BatchCreateChildrenRequest,
): Promise<ChildProfileResponse[]> => {
  const response = await axiosInstance.post<ChildProfileResponse[]>(
    "/parent/me/children",
    data,
  );
  return response.data;
};

export const getChildren = async (): Promise<ChildProfileResponse[]> => {
  const response = await axiosInstance.get<ChildProfileResponse[]>(
    "/parent/me/children",
  );
  return response.data;
};

export const getChildById = async (
  childId: string,
): Promise<ChildProfileResponse> => {
  const response = await axiosInstance.get<ChildProfileResponse>(
    `/parent/me/children/${childId}`,
  );
  return response.data;
};
