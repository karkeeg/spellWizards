"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createChildren,
  getChildren,
  getChildById,
  BatchCreateChildrenRequest,
  ChildProfileResponse,
} from "@/services/child.service";

export function useCreateChildren() {
  return useMutation<ChildProfileResponse[], Error, BatchCreateChildrenRequest>({
    mutationFn: (data: BatchCreateChildrenRequest) => createChildren(data),
  });
}

export function useChildren() {
  return useQuery<ChildProfileResponse[], Error>({
    queryKey: ["children"],
    queryFn: getChildren,
  });
}

export function useChildDetails(childId: string) {
  return useQuery<ChildProfileResponse, Error>({
    queryKey: ["child", childId],
    queryFn: () => getChildById(childId),
    enabled: !!childId,
  });
}
