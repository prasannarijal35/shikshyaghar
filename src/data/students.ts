import type { StaticImageData } from "next/image";
import defaultAvatar from "@/assets/teachers/teacher1.png"; // Import your image

// 1. Define the Student interface
export interface Student {
  id: number;
  name: string;
  email: string;
  image: string | StaticImageData;
  course: string;
  enrollmentDate: string;
}

// 2. Create mock data
export const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    image: defaultAvatar, // Corrected here
    course: "Computer Science",
    enrollmentDate: "2023-09-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    image: defaultAvatar,
    course: "Electrical Engineering",
    enrollmentDate: "2023-08-15",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    image: defaultAvatar,
    course: "Business Administration",
    enrollmentDate: "2023-07-20",
  },
];
