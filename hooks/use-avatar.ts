"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAvatars, addAvatar, deleteAvatar, AvatarItem } from "@/services/avatar.service";
import toast from "react-hot-toast";

export function useAvatars() {
  return useQuery<AvatarItem[], Error>({
    queryKey: ["avatars"],
    queryFn: getAvatars,
  });
}

export function useAddAvatar() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: {name: string, file: File}) => addAvatar(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatars"] });
      toast.success("Avatar added successfully");
    },
    onError: () => {
      toast.error("Failed to add avatar");
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteAvatar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatars"] });
      toast.success("Avatar deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete avatar");
    },
  });
}
