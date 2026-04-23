"use client";

import { useQuery } from "@tanstack/react-query";
import { getAvatars, AvatarItem } from "@/services/avatar.service";

export function useAvatars() {
  return useQuery<AvatarItem[], Error>({
    queryKey: ["avatars"],
    queryFn: getAvatars,
  });
}
