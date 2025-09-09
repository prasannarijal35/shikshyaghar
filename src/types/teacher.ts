export interface TeacherSubjectData {
  grade: string;
  subject: string;
  price?: number; // add price
}

export interface Teacher {
  id: number;
  slug: string; // added slug
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

  subjects?: TeacherSubjectData[]; // update type here
}
