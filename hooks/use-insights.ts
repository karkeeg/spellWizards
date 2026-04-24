"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getChildInsightsOverview,
  getParentRealms,
  getRealmSubtopics,
  ChildInsightsOverview,
  Realm,
  RealmSubtopicsResponse,
} from "@/services/insights.service";

export function useChildInsights(childId: string | null) {
  return useQuery<ChildInsightsOverview, Error>({
    queryKey: ["child-insights", childId],
    queryFn: () => getChildInsightsOverview(childId!),
    enabled: !!childId,
  });
}

export function useParentRealms() {
  return useQuery<Realm[], Error>({
    queryKey: ["parent-realms"],
    queryFn: getParentRealms,
  });
}

export function useRealmSubtopics(childId: string | null, realmId: string | null) {
  return useQuery<RealmSubtopicsResponse, Error>({
    queryKey: ["realm-subtopics", childId, realmId],
    queryFn: () => getRealmSubtopics(childId!, realmId!),
    enabled: !!childId && !!realmId,
  });
}
