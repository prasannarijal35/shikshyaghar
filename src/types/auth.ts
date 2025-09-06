// types/auth.ts
import { User } from "@/types/user";

export type Role = "student" | "teacher" | "admin";

// ---------- Payload Types (API) ---------- //
export type LoginPayload = {
  email: string;
  password: string;
  role: Role;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: Role;
};

// ---------- Frontend Form Types ---------- //
export type LoginFormData = Partial<LoginPayload> & {
  email: string; // required
  password: string; // required
};

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Exclude<Role, "admin">; // only teacher | student
  phone?: string;
  gender?: string;
  birthYear?: number;
  address?: string;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | ""; // student only
  teachingExperience?: number; // teacher only
};

// ---------- Response Types ---------- //
export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  redirectToProfile?: boolean; // new flag for teacher profile setup
}
