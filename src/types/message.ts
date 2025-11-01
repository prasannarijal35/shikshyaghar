// src/types/message.ts

// User information in messages
export interface MessageUser {
  id: number;
  fullName: string;
  email: string;
  role: "student" | "teacher" | "admin";
  phone?: string;
  gender?: "male" | "female" | "other";
  profilePicture?: string;
}

// Direct message between teacher and student
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subscriptionId: number;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  sender: MessageUser;
  receiver: MessageUser;
}

// Subscription info included with messages
export interface MessageSubscription {
  id: number;
  startDate: string;
  endDate: string;
  status: string;
}

// Response when getting messages
export interface GetMessagesResponse {
  messages: Message[];
  subscription: MessageSubscription;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Conversation list item
export interface Conversation {
  subscriptionId: number;
  otherUser: MessageUser;
  lastMessage: {
    message: string;
    createdAt: string;
    sender: {
      id: number;
      fullName: string;
    };
  } | null;
  unreadCount: number;
}

// Payload to send a message (new secure API - no senderId/senderRole)
export interface SendMessagePayload {
  receiverId: number;
  message: string;
}

// Payload to mark messages as read
export interface MarkAsReadPayload {
  messageIds: number[];
}
