export enum ClassStatus {
  Upcoming = "Upcoming",
  Live = "Live",
  Completed = "Completed",
}

export type TeacherClass = {
  id: number; // should be number, not string
  title: string; // matches DB title
  subject: string; // comes from teacherSubjectId → TeacherSubject.name
  grade: string; // comes from teacherSubjectId → Grade.name
  startTime: string; // ISO datetime
  duration: number; // minutes, not "1h"
  status: ClassStatus;
  meetingLink?: string;
};
