import { ClassStatus } from "@/types/teacher/class";

export const getLiveClassStatus = (
  startTime: string | null,
  duration: number
): ClassStatus => {
  if (!startTime) {
    return ClassStatus.Upcoming;
  }

  const start = new Date(startTime);
  if (isNaN(start.getTime())) {
    // Invalid date format
    return ClassStatus.Upcoming;
  }

  const end = new Date(start.getTime() + duration * 60000);
  const now = new Date();

  if (now < start) {
    return ClassStatus.Upcoming;
  }
  if (now > end) {
    return ClassStatus.Completed;
  }
  return ClassStatus.Live;
};

export const getToken = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
};
