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

export interface AddAvatarPayload {
  name: string;
  image_url: string;
  sort_order?: number;
  is_active?: boolean;
}

export const getAvatars = async (): Promise<AvatarItem[]> => {
  console.log("Fetching avatars from /admin-parent/avatars");
  const response = await axiosInstance.get<AvatarItem[]>("/admin-parent/avatars");
  console.log("Fetched avatars:", response.data);
  return response.data;
};

export const addAvatar = async (payload: AddAvatarPayload): Promise<AvatarItem> => {
  console.log("Adding avatar JSON:", payload.name);
  try {
    const response = await axiosInstance.post<AvatarItem>("/admin-parent/avatars", payload);
    console.log("Add avatar response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding avatar details:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAvatar = async (id: string): Promise<void> => {
  console.log("Deleting avatar with id:", id);
  try {
    await axiosInstance.delete(`/admin-parent/avatars/${id}`);
    console.log("Avatar deleted successfully");
  } catch (error: any) {
    console.error("Error deleting avatar details:", error.response?.data || error.message);
    throw error;
  }
};
