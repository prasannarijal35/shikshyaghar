// types/teacherSubject.ts

export interface Grade {
  id: number;
  name: string;
  slug?: string;
}

export interface Subject {
  id: number;
  name: string;
  slug?: string;
}

export interface GradeSubjectWithDetails {
  id: number;
  gradeId: number;
  subjectId: number;
  price?: number;
  createdAt: string;
  updatedAt: string;
  grade: Grade;
  subject: Subject;
}

export interface TeacherSubjectWithDetails {
  teacherSubjectId: number; // maps to id
  teacherId: number;
  gradeSubjectId: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  teacher: {
    id: number;
    userId: number;
    bio: string;
    experience: string;
    availability: string;
    createdAt: string;
    updatedAt: string;
  };
  gradeSubject: GradeSubjectWithDetails;
}
