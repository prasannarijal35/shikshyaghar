// src/services/messageService.ts
"use client";
import myAxios from "./apiServices";
import {
  Message,
  SendMessagePayload,
  GetMessagesResponse,
  Conversation,
  MarkAsReadPayload,
} from "@/types/message";

const useMessageService = () => {
  /**
   * Send a direct message to another user
   * Sender is automatically determined from JWT token
   * @param payload - receiverId and message
   * @returns The created message with sender/receiver details
   */
  const sendMessage = async (payload: SendMessagePayload): Promise<Message> => {
    const response = await myAxios.post("/messages", payload);
    return response.data.data;
  };

  /**
   * Get messages with another user
   * @param userId - The ID of the other user (teacher or student)
   * @param page - Page number (default: 1)
   * @param limit - Messages per page (default: 100)
   * @returns Messages with subscription info and pagination
   */
  const getMessages = async (
    userId: number,
    page: number = 1,
    limit: number = 100
  ): Promise<GetMessagesResponse> => {
    try {
      const response = await myAxios.get(`/messages/${userId}`, {
        params: { page, limit },
      });
      console.log("getMessages response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "getMessages error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  /**
   * Get all conversations for the current user
   * @returns List of conversations with last message and unread count
   */
  const getConversations = async (): Promise<Conversation[]> => {
    try {
      const response = await myAxios.get("/messages/conversations");
      console.log("getConversations response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "getConversations error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  /**
   * Mark messages as read
   * @param payload - Array of message IDs to mark as read
   * @returns Count of updated messages
   */
  const markAsRead = async (
    payload: MarkAsReadPayload
  ): Promise<{ updatedCount: number }> => {
    const response = await myAxios.post("/messages/mark-read", payload);
    return response.data.data;
  };

  return {
    sendMessage,
    getMessages,
    getConversations,
    markAsRead,
  };
};

export default useMessageService;
