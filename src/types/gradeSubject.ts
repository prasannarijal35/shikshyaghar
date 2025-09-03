export interface GradeSubject {
  id: number;
  price: number;
  grade: {
    id: number;
    name: string;   // e.g. "8"
  };
  subject: {
    id: number;
    name: string;   // e.g. "Science"
  };
  createdAt: string;
  updatedAt: string;
}