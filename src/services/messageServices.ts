// src/services/messageService.ts
import myAxios from "./apiServices";
import { Message } from "@/types/message";
interface SendMessagePayload {
  senderId: number;
  receiverId: number;
  message: string;
  senderRole: "STUDENT" | "TEACHER";
}

const messageService = {
  // Send a message
  sendMessage: async (payload: SendMessagePayload): Promise<Message> => {
    const response = await myAxios.post("/messages", payload);
    if (!response.data.data) throw new Error("Message could not be sent");
    return response.data.data;
  },

  // Get chat history for a subscription
  getMessages: async (subscriptionId: number): Promise<Message[]> => {
    const response = await myAxios.get(`/messages/${subscriptionId}`);
    if (!response.data.data) throw new Error("No messages found");
    return response.data.data;
  },
};

export default messageService;
export type { Message, SendMessagePayload };
