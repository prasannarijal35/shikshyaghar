// types/auth.ts
import { User } from "@/types/user";

export type Role = "student" | "teacher";

export type LoginFormData = {
  email: string;
  password: string;
  role: Role;
};

export type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  phone?: string;
  gender?: string;
  birthYear?: number;
  address?: string;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | ""; // for student only
  teachingExperience?: number; // optional, teacher only
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;

  role: "teacher" | "student" | "admin";
};

// Frontend form data
export type LoginFormData = Partial<LoginPayload> & {
  email: string;
  password: string;
  role: "teacher" | "student" | "admin";
};

  confirmPassword: string;
  role: Role;
  phone?: string;
  gender?: string;
  birthYear?: number;
  address?: string;
  currentlyStudying?: "bachelor" | "master" | "phd" | "other" | ""; // student only
  teachingExperience?: number; // teacher only
};

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

