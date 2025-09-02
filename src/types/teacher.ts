import { StaticImageData } from "next/image";
import { GradeSubject } from "./gradeSubject";
export interface Teacher {
  id: number;
  name: string;
  gender: string;
  age: number;
  contact: string;
  email: string;
  education: string;
  teachingExperience: string;
  city: string;
  teacherSubject: {
    id: number;
    name: string;
    slug: string;
  };
  rating: number;
  slug: string;
  image: string|StaticImageData;
  about: string;
  grade: string[]; // optional, can keep or remove
  gradeSubjects: GradeSubject[];  // NEW
}