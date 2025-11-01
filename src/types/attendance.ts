// src/types/attendance.ts

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export interface Attendance {
  id: number;
  subscriptionId: number;
  studentId: number;
  teacherSubjectId: number;
  attendanceDate: string;
  status: AttendanceStatus;
  markedBy: number;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  marker?: {
    id: number;
    fullName: string;
  };
}

export interface AttendanceStatistics {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export interface MarkAttendancePayload {
  subscriptionId: number;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface BulkAttendanceItem {
  subscriptionId: number;
  status: AttendanceStatus;
  remarks?: string;
}

export interface BulkMarkAttendancePayload {
  teacherSubjectId: number;
  attendanceDate: string;
  attendances: BulkAttendanceItem[];
}

export interface AttendanceBySubscriptionResponse {
  subscriptionId: number;
  student: {
    id: number;
    fullName: string;
    email: string;
  };
  teacherSubject: {
    id: number;
    subjectName: string;
  };
  attendances: Attendance[];
  statistics: AttendanceStatistics;
}

export interface StudentAttendanceSummary {
  subscriptionId: number;
  student: {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    gender?: string;
  };
  subscriptionPeriod: {
    startDate: string;
    endDate: string;
  };
  attendanceSummary: AttendanceStatistics;
  recentAttendance: Attendance[];
}

export interface ClassAttendanceResponse {
  teacherSubjectId: number;
  totalStudents: number;
  students: StudentAttendanceSummary[];
}

export interface BulkAttendanceResult {
  subscriptionId: number;
  success: boolean;
  message: string;
  attendance?: Attendance;
}

export interface BulkMarkAttendanceResponse {
  total: number;
  successful: number;
  failed: number;
  results: BulkAttendanceResult[];
}
