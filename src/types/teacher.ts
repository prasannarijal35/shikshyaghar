export interface Teacher {
  id: number;
  fullName: string;
  email: string;
  role: string;
  address: string;
  phone: number | null; // phone is number in your API
  gender: string | null;
  birthYear: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  teacher: TeacherDetails;
}

export interface TeacherDetails {
  id: number;
  bio: string;
  experience: number; // number, not string
  availability: string;
  qualification: string;
  profilePicture: string | null;
  status: string;
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
  grade: Grade;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Grade {
  id: number;
  name: string;
}
