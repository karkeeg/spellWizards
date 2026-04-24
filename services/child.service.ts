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

export interface UpdateChildRequest {
  name?: string;
  email?: string; // mapping to username in UI
  password?: string;
  current_spelling_level?: string;
  avatar_url?: string;
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

export const updateChild = async (
  childId: string,
  data: UpdateChildRequest,
): Promise<ChildProfileResponse> => {
  const response = await axiosInstance.patch<ChildProfileResponse>(
    `/parent/me/children/${childId}`,
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

export interface CustomWordResponse {
  id: string;
  child_id: string;
  word: string;
  grade_band?: string;
  status: string; // 'active' | 'mastered' | 'inactive'
  created_at: string;
  questions?: object[];
}

export const getCustomWords = async (
  childId: string,
): Promise<CustomWordResponse[]> => {
  const response = await axiosInstance.get(
    `/parent/me/children/${childId}/custom-words`,
  );
  const data = response.data;
  // Normalize: API may return array directly, or { words: [...] }, or { data: [...] }
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.words)) return data.words;
  if (data && Array.isArray(data.data)) return data.data;
  console.warn("Unexpected custom words response shape:", data);
  return [];
};

export const addCustomWord = async (
  childId: string,
  word: string,
): Promise<CustomWordResponse> => {
  const response = await axiosInstance.post<CustomWordResponse>(
    `/parent/me/children/${childId}/custom-words`,
    { word },
  );
  return response.data;
};

export interface WeeklyActivity {
  day: string;
  xp: number;
}

export interface ChildStatsResponse {
  total_xp_earned: number;
  total_quests_completed: number;
  weekly_activity: WeeklyActivity[];
  total_weekly_practice_minutes?: number;
}

export const getChildStats = async (
  childId: string,
): Promise<ChildStatsResponse> => {
  const response = await axiosInstance.get<ChildStatsResponse>(
    `/parent/child/${childId}/stats`,
  );
  return response.data;
};

