"use client";
import myAxios from "./apiServices";
import {
  CommunityMessage,
  SendCommunityMessagePayload,
  GetCommunityMessagesResponse,
} from "@/types/community";

const useCommunityService = () => {
  /**
   * Send a message to a community
   * @param payload - teacherSubjectId and message
   * @returns The created community message
   */
  const sendMessage = async (
    payload: SendCommunityMessagePayload
  ): Promise<CommunityMessage> => {
    const response = await myAxios.post("/community", payload);
    return response.data.data;
  };

  /**
   * Get messages from a community
   * @param teacherSubjectId - The teacher subject ID
   * @param page - Page number (default: 1)
   * @param limit - Number of messages per page (default: 50)
   * @returns Community messages with pagination
   */
  const getMessages = async (
    teacherSubjectId: number,
    page: number = 1,
    limit: number = 50
  ): Promise<GetCommunityMessagesResponse> => {
    const response = await myAxios.get(`/community/${teacherSubjectId}`, {
      params: { page, limit },
    });
    return response.data.data;
  };

  return {
    sendMessage,
    getMessages,
  };
};

export default useCommunityService;
