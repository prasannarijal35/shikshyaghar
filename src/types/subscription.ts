export enum SubscriptionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
}

export interface UserType {
  id: number;
  fullName: string;
  email: string;
  slug: string;
}

export interface TeacherType {
  id: number;
  user: UserType;
}

export interface GradeType {
  id: number;
  name: string;
}

export interface SubjectType {
  id: number;
  name: string;
}

export interface GradeSubjectType {
  id: number;
  gradeId: number;
  subjectId: number;
  price: number;
  grade?: GradeType;
  subject?: SubjectType;
}

export interface TeacherSubjectType {
  id: number;
  teacher: TeacherType;
  gradeSubject: GradeSubjectType;
  price: number;
  duration: number;
  meetingLink: string;
}

export interface SubscriptionType {
  id: number;
  studentId: number;
  studentName?: string; // Add this
  studentEmail?: string; // Add this
  studentProfilePicture?: string;
  teacherSubjectId: number;
  teacherSubject?: TeacherSubjectType;
  teacherId: number;
  teacherName: string;
  teacherEmail: string;
  teacherSlug: string;
  gradeSubjectId?: number;
  gradeId: number;
  gradeName: string;
  subjectId: number;
  subjectName: string;
  price: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;

  // Optional UI helpers
  displayName?: string;
  statusColor?: string;
}
