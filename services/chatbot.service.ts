import axiosInstance from "@/lib/axios";

export interface ChatbotRequest {
  parent_input: string;
  child_id?: string;
}

export interface ChatbotResponse {
  child_id?: string;
  parent_input: string;
  resolved_intent: string;
  generated_response: string;
  used_data: Record<string, any>;
}

export const sendChatMessage = async (
  childId: string | null,
  data: ChatbotRequest
): Promise<ChatbotResponse> => {
  const url = childId && childId !== "general"
    ? `/parent/chatbot?child_id=${childId}`
    : `/parent/chatbot`;
    
  const response = await axiosInstance.post<ChatbotResponse>(
    url,
    { parent_input: data.parent_input }
  );
  return response.data;
};
