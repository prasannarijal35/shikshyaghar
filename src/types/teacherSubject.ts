// User info
export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  slug: string;
  phone?: number;
  gender?: string;
  birthYear?: number;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Teacher info
export interface Teacher {
  id: number;
  userId: number;
  bio: string;
  experience?: number | null;
  availability: string;
  qualification: string;
  documentUrl: string;
  profilePicture: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

// Grade info
export interface Grade {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

// Subject info
export interface Subject {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

// GradeSubject info
export interface GradeSubject {
  id: number;
  gradeId: number;
  subjectId: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  grade: Grade;
  subject: Subject;
}
export interface CreateClassForm {
  gradeSubjectId: number;
  startTime: string;
  price: number;
  duration: number;
  meetinglink: string;
  description?: string;
}

// TeacherSubjectAssignment (nested teacher + gradeSubject)
export interface TeacherSubjectAssignment {
  id: number; // id of teacher_subject
  teacherId: number;
  gradeSubjectId: number;
  startTime: string;
  duration: number;
  meetinglink: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
  gradeSubject: GradeSubject;
}

// Full response type
export interface TeacherSubjectsResponse {
  success: boolean;
  message: string;
  data: TeacherSubjectAssignment[];
}
