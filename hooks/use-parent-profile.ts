"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getParentProfile, updateParent, ParentProfile, UpdateParentRequest } from "@/services/parent.service";

export function useParentProfile() {
  return useQuery<ParentProfile, Error>({
    queryKey: ["parent-profile"],
    queryFn: getParentProfile,
  });
}

export function useUpdateParentProfile() {
  const queryClient = useQueryClient();
  return useMutation<ParentProfile, Error, UpdateParentRequest>({
    mutationFn: (data: UpdateParentRequest) => updateParent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-profile"] });
    },
  });
}
