import { User } from "@/types/user";

// ---------------- Role Types ---------------- //
export type Role = "student" | "teacher" | "admin";

// ---------------- Payload Types (API) ---------------- //
// Common payload for login
export type LoginPayload = {
  email: string;
  password: string;
  role: Role;
};

// Student registration payload
export type StudentRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: "student";
  phone?: number;
  gender?: string;
  birthYear?: number;
  address?: string;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | "";
};

// Teacher registration payload
export type TeacherRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: "teacher";
  phone?: number;
  gender?: string;
  birthYear?: number;
  address?: string;

  // Teacher-specific fields
  bio?: string;
  availability?: string;
  qualification?: string;
  teachingExperience?: number;

  // Both files are required for approval
  profilePicture: File;
  document: File;
};

// ---------------- Frontend Form Types ---------------- //
export type LoginFormData = Partial<LoginPayload> & {
  email: string;
  password: string;
};

export type StudentRegisterFormData = StudentRegisterPayload & {
  confirmPassword: string;
};

export type TeacherRegisterFormData = TeacherRegisterPayload & {
  confirmPassword: string;
};

// ---------------- Teacher API Response Types ---------------- //
export interface TeacherData {
  user: User;
  teacher: Teacher;
}

export interface Teacher {
  id: number;
  userId: number;
  bio?: string;
  experience?: number;
  availability?: string;
  qualification?: string;
  profilePicture: string; // URL string (required)
  documentUrl: string; // URL string (required)
  status: "pending" | "approved" | "rejected";
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

// ---------------- API Response Types ---------------- //
export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: TeacherData; // Only returned for teacher registration
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  redirectToProfile?: boolean; // true if teacher needs profile setup
}
