"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getChildInsightsOverview,
  getParentRealms,
  ChildInsightsOverview,
  Realm,
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
