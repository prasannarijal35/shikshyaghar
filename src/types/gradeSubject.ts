export type GradeSubject = {
  grade: string; // e.g. "Grade 8"
  subject: {
    id: number;
    name: string;
    slug: string;
  };
};
