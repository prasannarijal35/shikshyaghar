import { StaticImageData } from "next/image";

// types/student.ts
export interface Student {
  id: number;
  name: string;
  image?:string | StaticImageData;
  email: string;
  course: string;
  enrollmentDate: string;
}