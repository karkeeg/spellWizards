import axiosInstance from "@/lib/axios";

// ─── Child Insights Overview ──────────────────────────────────────────────────

export interface RealmProgressItem {
  realmId: string;
  realmName: string;
  characterImageUrl: string | null;
  questsCompleted: number;
  questsTotal: number;
  percentCompleted: number;
  status: string;
}

export interface AttributeItem {
  name: string;
  score: number;
  maxScore: number;
  iconColor: string;
}

export interface ChildInsightsOverview {
  childId: string;
  realmProgress: RealmProgressItem[];
  attributes: AttributeItem[];
}

export const getChildInsightsOverview = async (
  childId: string,
): Promise<ChildInsightsOverview> => {
  const response = await axiosInstance.get<ChildInsightsOverview>(
    `/insights/${childId}/overview`,
  );
  return response.data;
};

// ─── Realm Subtopics ──────────────────────────────────────────────────────────

export interface RealmSubtopic {
  subtopicId: string;
  name: string;
  questsCompleted: number;
  questsTotal: number;
  percentProgress: number;
  masteryStatus: string;
}

export interface RealmSubtopicsResponse {
  realmId: string;
  realmName: string;
  questsCompleted: number;
  questsTotal: number;
  percentCompleted: number;
  subtopics: RealmSubtopic[];
}

export const getRealmSubtopics = async (
  childId: string,
  realmId: string
): Promise<RealmSubtopicsResponse> => {
  const response = await axiosInstance.get<RealmSubtopicsResponse>(
    `/insights/${childId}/realms/${realmId}/subtopics`
  );
  return response.data;
};

// ─── Parent Realms ────────────────────────────────────────────────────────────

export interface Realm {
  id: string;
  name: string;
  description: string;
  characterImageUrl: string | null;
  topics: string[];
  [key: string]: unknown; // allow extra fields from API
}

export const getParentRealms = async (): Promise<Realm[]> => {
  const response = await axiosInstance.get<Realm[]>("/parent/realms");
  // API might return { realms: [...] } or an array directly
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray((data as Record<string, unknown>).realms))
    return (data as Record<string, unknown>).realms as Realm[];
  return [];
};
