export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  slug: string;
}

export interface Teacher {
  id: number;
  userId: number;
  bio: string;
  experience?: string | null;
  availability: string;
  qualification: string;
  documentUrl: string;
  profilePicture: string;
  status: string;
  user: User;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface GradeSubject {
  id: number;
  gradeId: number;
  subjectId: number;
  price: number;
  grade: Grade;
  subject: Subject;
}

export interface TeacherSubjectAssignment {
  id: number;
  teacherId: number;
  gradeSubjectId: number;
  startTime: string;
  duration: number;
  meetinglink: string;
  description?: string;
  price: number;
  teacher: Teacher;
  gradeSubject: GradeSubject;
}

export interface TeacherSubjectsResponse {
  status: number;
  message: string;
  data: TeacherSubjectAssignment[];
  errors?: string[];
}

export interface CreateClassForm {
  gradeSubjectId: string;
  startTime: string;
  duration: string;
  price: string;
  meetinglink: string;
  description: string;
}
