import axiosInstance from "@/lib/axios";

export interface AvatarItem {
  id: string;
  name: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getAvatars = async (): Promise<AvatarItem[]> => {
  const response = await axiosInstance.get<AvatarItem[]>("/admin-parent/avatars");
  return response.data;
};
