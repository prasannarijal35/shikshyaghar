// src/types/message.ts
export interface UserSummary {
  id: number;
  fullName: string;
  profilePicture?: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subscriptionId: number;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  sender?: UserSummary;
  receiver?: UserSummary;
}
