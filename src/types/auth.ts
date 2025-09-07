// =======================
// Frontend → Backend Request Types
// =======================

// Student registration form data
export interface StudentRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  educationLevel?: string;
  bio?: string;
  gradeId?: number;
}

// Teacher registration form data
export interface TeacherRegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
  gender?: "male" | "female" | "other";
  birthYear?: number;
  bio?: string;
  experience?: number;
  availability?: string;
  qualification?: string;
  profilePicture?: File;
  document?: File;
}

// Login form data (shared for both students and teachers)
export interface LoginFormData {
  email: string;
  password: string;
}

// =======================
// Backend → Frontend Response Types
// =======================

// Student profile returned from backend
export interface StudentData {
  id: number;
  userId: number;
  educationLevel?: string;
  bio?: string;
  gradeId?: number;
  createdAt: string;
  updatedAt: string;
}

// Teacher profile returned from backend
export interface TeacherData {
  id: number;
  userId: number;
  bio?: string;
  experience?: number;
  availability?: string;
  qualification?: string;
  profilePicture?: string;
  documentUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

// User object returned after login or registration
export interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: "student" | "teacher" | "admin" | "user";
  phone?: string;
  address?: string;
  slug?: string;
  student?: StudentData;
  teacher?: TeacherData;
}

// Login response
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserData;
}

// Registration responses
export interface StudentRegisterResponse {
  status: number;
  message: string;
  data: {
    user: UserData;
    student?: StudentData;
  };
}

export interface TeacherRegisterResponse {
  status: number;
  message: string;
  data: {
    user: UserData;
    teacher: TeacherData;
  };
}

// Union type for registration payloads
export type RegisterFormData =
  | StudentRegisterFormData
  | TeacherRegisterFormData;