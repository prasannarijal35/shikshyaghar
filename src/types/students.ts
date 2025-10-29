export type Grade = {
  id: number;
  name: string;
};

export type StudentData = {
  id?: number;
  userId?: number;
  educationLevel?: string | null;
  bio?: string | null;
  gradeId?: number | null;
  profilePicture?: string | null;
  grade?: Grade | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Student = {
  id: number;
  slug: string;
  fullName: string;
  email: string;
  address?: string | null;
  phone?: string | null;
  gender?: string | null;
  birthYear?: number | null;
  student?: StudentData | null;
  createdAt: string;
  updatedAt: string;
};

// types/student.ts

export interface StudentDetails {
  id: number;
  fullName: string;
  email: string;
  role: string;
  student: {
    id: number;
    userId: number;
    educationLevel: string;
    bio: string;
    gradeId: number;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
  };
}
