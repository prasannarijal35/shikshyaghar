export interface User {
  id: number;
  email: string;
  fullName: string;
  role: "teacher" | "student" | "admin";
  slug: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  birthYear?: number;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  userId: number;
  bio: string;
  experience?: number | null;
  availability: string;
  qualification: string;
  documentUrl: string;
  profilePicture: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  updatedAt: string;
  user: User;
}
export interface Subject {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeSubject {
  id: number;
  gradeId: number;
  subjectId: number;
  price?: number | null;
  createdAt: string;
  updatedAt: string;
  grade: Grade;
  subject: Subject;
}

export interface CreateClassForm {
  id?: number;
  gradeSubjectId: number;
  startTime: string;
  price?: number;
  duration: number;
  meetingLink: string;
  description?: string;
  teacherId?: number;
}

export interface TeacherSubjectAssignment {
  id: number;
  teacherId: number;
  gradeSubjectId: number;
  startTime: string;
  duration: number;
  meetingLink: string;
  description?: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
  gradeSubject: GradeSubject;
  formattedStartTime: string;
  formattedEndTime: string;
  status: "upcoming" | "live" | "completed";
}
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TeacherSubjectsResponse {
  status: number;
  message: string;
  data: {
    items: TeacherSubjectAssignment[];
    pagination: Pagination;
  };
  errors?: string[];
}
