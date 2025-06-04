// data/program.ts
import type { Program } from "@/types/program";
import defaultProgramImage from "@/assets/bannerimages/banner1.jpg"; // Replace or add custom ones

export const mockPrograms: Program[] = [
  {
    id: 1,
    title: "Class 8",
    description: "Covers Math, Science, English, and more. Foundation building for SEE.",
    link: "/programs/class-8",
    image: defaultProgramImage,
  },
  {
    id: 2,
    title: "Class 9",
    description: "In-depth subject-wise preparation aligned with school curriculum.",
    link: "/programs/class-9",
    image: defaultProgramImage,
  },
  {
    id: 3,
    title: "Class 10 (SEE)",
    description: "Special focus on SEE preparation with weekly tests and mock exams.",
    link: "/programs/class-10",
    image: defaultProgramImage,
  },
  {
    id: 4,
    title: "Grade 11 (Science)",
    description: "Advanced coaching for Physics, Chemistry, Biology, and Mathematics.",
    link: "/programs/grade-11-science",
    image: defaultProgramImage,
  },
  {
    id: 5,
    title: "Grade 11 (Management)",
    description: "Focused curriculum for Business Studies, Accounting, and Economics.",
    link: "/programs/grade-11-management",
    image: defaultProgramImage,
  },
  {
    id: 6,
    title: "Grade 12 (Science)",
    description: "Comprehensive prep for board and entrance exams with expert tutors.",
    link: "/programs/grade-12-science",
    image: defaultProgramImage,
  },
  {
    id: 7,
    title: "Grade 12 (Management)",
    description: "Intensive coaching for final exams with career guidance sessions.",
    link: "/programs/grade-12-management",
    image: defaultProgramImage,
  },
];
