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
  student?: StudentData | null; // nested student object
  createdAt: string;
  updatedAt: string;
};
