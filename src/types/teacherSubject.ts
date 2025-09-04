// types/teacherSubject.ts

export interface TeacherSubject {
  teacherSubjectId: number; // maps to TeacherSubject.id
  teacherId: number;
  gradeSubjectId: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

// Optional: If you want to include related grade and subject info
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

export interface TeacherSubjectWithDetails {
  teacherSubjectId: number;
  teacherId: number;
  gradeSubjectId: number;
  price: number;
  grade: Grade;
  subject: Subject;
  createdAt: string;
  updatedAt: string;
}
