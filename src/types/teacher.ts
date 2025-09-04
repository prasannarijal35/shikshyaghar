export interface TeacherDetails {
  id: number;
  userId: number;
  bio: string;
  experience: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  fullName: string;
  email: string;
  role: string;
  address: string;
  phone: string | null;
  gender: string | null;
  birthYear: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  teacher: TeacherDetails;
}
