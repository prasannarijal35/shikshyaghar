export type Role = "student" | "teacher" | "admin" | "user";

export type User = {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  address?: string | null;
  phone?: string | null;
  gender?: string | null;
  birthYear?: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  student?: {
    id: number;
    userId: number;
    educationLevel: string;
    bio?: string | null;
    gradeId?: number | null;
  };
  teacher?: {
    id: number;
    userId: number;
    bio?: string | null;
    experience: number;
    availability: string;
  };
};
