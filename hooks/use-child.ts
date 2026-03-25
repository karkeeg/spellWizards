"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChildren,
  getChildren,
  getChildById,
  getCustomWords,
  addCustomWord,
  BatchCreateChildrenRequest,
  ChildProfileResponse,
  CustomWordResponse,
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

export function useCustomWords(childId: string | null) {
  return useQuery<CustomWordResponse[], Error>({
    queryKey: ["custom-words", childId],
    queryFn: () => getCustomWords(childId!),
    enabled: !!childId,
  });
}

export function useAddCustomWord() {
  const queryClient = useQueryClient();
  return useMutation<CustomWordResponse, Error, { childId: string; word: string }>({
    mutationFn: ({ childId, word }) => addCustomWord(childId, word),
    onSuccess: (_, variables) => {
      // Invalidate the words list for this child so it refetches
      queryClient.invalidateQueries({ queryKey: ["custom-words", variables.childId] });
    },
  });
}
