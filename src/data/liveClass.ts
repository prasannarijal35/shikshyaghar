import { ClassStatus, LiveClass } from "@/types/teacher/class";

const dummyLiveClasses: LiveClass[] = [
  {
    id: 1,
    title: "Grade 9 - Mathematics Live Class",
    grade: "Grade 9",
    subject: "Mathematics",
    startTime: "2025-09-03T14:00:00.000Z",
    duration: 60,
    status: ClassStatus.Upcoming,
    meetingLink: "https://zoom.us/j/1234567890", // fixed property name
  },
  {
    id: 2,
    title: "Grade 9 - Science Live Class",
    grade: "Grade 9",
    subject: "Science",
    startTime: "2025-09-03T15:30:00.000Z",
    duration: 45,
    status: ClassStatus.Upcoming,
    meetingLink: "https://zoom.us/j/2345678901",
  },
  {
    id: 3,
    title: "Grade 10 - Mathematics Live Class",
    grade: "Grade 10",
    subject: "Mathematics",
    startTime: "2025-09-03T13:00:00.000Z",
    duration: 60,
    status: ClassStatus.Live,
    meetingLink: "https://zoom.us/j/3456789012",
  },
  {
    id: 4,
    title: "Grade 10 - English Live Class",
    grade: "Grade 10",
    subject: "English",
    startTime: "2025-09-02T10:00:00.000Z",
    duration: 50,
    status: ClassStatus.Completed,
    meetingLink: "https://zoom.us/j/4567890123",
  },
];

export default dummyLiveClasses;
