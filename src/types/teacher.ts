export interface TeacherSubjectData {
  id: number;
  grade: string;
  subject: string;
  price?: number;
}

export interface Teacher {
  id: number;
  teacherId?: number;
  slug: string;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  birthYear?: number;
  address?: string;
  role?: string;

  bio?: string;
  experience?: number;
  availability?: string;
  qualification?: string;
  profilePicture?: string;
  documentUrl?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;

  subjects?: TeacherSubjectData[];
}
