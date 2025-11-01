// Community message types based on backend API specification

export interface CommunitySender {
  id: number;
  fullName: string;
  email: string;
  role: "student" | "teacher" | "admin";
  phone?: string;
  gender?: "male" | "female" | "other";
}

export interface CommunityMessage {
  id: number;
  teacherSubjectId: number;
  senderId: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: CommunitySender;
}

export interface SendCommunityMessagePayload {
  teacherSubjectId: number;
  message: string;
}

export interface GetCommunityMessagesResponse {
  messages: CommunityMessage[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
