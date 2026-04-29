import axiosInstance from "@/lib/axios";

export interface ChatbotRequest {
  parent_input: string;
}

export interface ChatbotResponse {
  child_id: string;
  parent_input: string;
  resolved_intent: string;
  generated_response: string;
  used_data: Record<string, any>;
}

export const sendChatMessage = async (
  childId: string,
  data: ChatbotRequest
): Promise<ChatbotResponse> => {
  const response = await axiosInstance.post<ChatbotResponse>(
    `/parent/chatbot?child_id=${childId}`,
    data
  );
  return response.data;
};
