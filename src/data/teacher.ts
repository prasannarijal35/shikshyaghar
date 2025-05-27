import teacher1Photo from "@/assets/teachers/teacher1.png";
import teacher2Photo from "@/assets/teachers/teacher1.png";

import { Teacher } from "@/types/teacher";

export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Sangay Dorji",
    gender: "Male",
    age: 32,
    contact: "9841234567",
    email: "sangay@example.com",
    education: "M.Ed. in Mathematics",
    teachingExperience: "10 years",
    city: "Thimphu",
    subjects: ["Mathematics", "Physics"],
    rating: 4.5,
    slug: "sangay-dorji",
    photo: teacher1Photo.src,
    about:
      "I am passionate about helping students develop strong analytical and problem-solving skills. With over a decade of teaching experience, I strive to make complex mathematical and physical concepts easy to understand through real-life applications and engaging methods.",
  },
  {
    id: 2,
    name: "Kiran Sharma",
    gender: "Female",
    age: 28,
    contact: "9851122334",
    email: "kiran@example.com",
    education: "M.A. in English Literature",
    teachingExperience: "7 years",
    city: "Kathmandu",
    subjects: ["English", "Communication Skills"],
    rating: 4.8,
    slug: "kiran-sharma",
    photo: teacher2Photo.src,
    about:
      "As an enthusiastic English educator, I believe in the power of language to transform lives. I focus on building confidence in communication while fostering a love for literature and critical thinking among my students. My sessions are interactive, inclusive, and tailored to each learner's needs.",
  },
];
