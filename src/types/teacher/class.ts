// import { TeacherSubjectWithDetails } from "../teacherSubject";
export enum ClassStatus {
  Upcoming = "Upcoming",
  Live = "Live",
  Completed = "Completed",
}

export interface LiveClass {
  id: number;
  title: string;
  grade: string;
  subject: string;
  teacherSubjectId: number;
  startTime: string;
  duration: number;
  status: ClassStatus;
  meetingLink?: string;
}
export type ClassData = {
  teacherSubjectId: number;
  startTime: string;
  duration: number;
  zoomLink?: string;
};
