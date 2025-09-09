export interface GradeSubject {
  id: number;
  price: number;
  grade: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
