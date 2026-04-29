"use client";

import { useMutation } from "@tanstack/react-query";
import { sendChatMessage, ChatbotRequest, ChatbotResponse } from "@/services/chatbot.service";

export function useChatbot() {
  return useMutation<ChatbotResponse, Error, { childId: string; data: ChatbotRequest }>({
    mutationFn: ({ childId, data }) => sendChatMessage(childId, data),
  });
}
