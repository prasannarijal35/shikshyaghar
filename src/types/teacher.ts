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

export interface TeacherDetails {
  id: number;
  userId: number;
  bio: string;
  contact:string;
  gender:string;
  experience: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
  teacherSubjects: TeacherSubjectWithDetails[];
}

export interface TeacherSubjectWithDetails {
  id: number;
  gradeSubject: GradeSubjectWithSubject;
}

export interface GradeSubjectWithSubject {
  id: number;
  subject: Subject;
  grade: Subject;
}

export interface Subject {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
