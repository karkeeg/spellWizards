"use client";

import { useQuery } from "@tanstack/react-query";
import { getParentProfile, ParentProfile } from "@/services/parent.service";

export function useParentProfile() {
  return useQuery<ParentProfile, Error>({
    queryKey: ["parent-profile"],
    queryFn: getParentProfile,
  });
}
