// services/gradeSubjectService.ts
import myAxios from "./apiServices";
import { GradeSubject } from "@/types/gradeSubject";

const gradeSubjectService = {
  // Get all grade-subject records
  getAllGradeSubjects: async (): Promise<GradeSubject[]> => {
    const response = await myAxios.get("/gradeSubjects");
    if (!response.data.data) throw new Error("No data returned");
    return response.data.data;
  },

  // Get a single grade-subject by ID
  getGradeSubjectById: async (id: number): Promise<GradeSubject> => {
    const response = await myAxios.get(`/gradeSubjects/${id}`);
    if (!response.data.data) throw new Error("Record not found");
    return response.data.data;
  },

  // Assign a subject to a grade
  assignGradeSubject: async (payload: {
    gradeId: number;
    subjectId: number;
    price: number;
  }): Promise<GradeSubject> => {
    const response = await myAxios.post("/gradeSubjects", payload);
    return response.data.data;
  },

  // Update a grade-subject record
  updateGradeSubject: async (id: number, payload: {
    gradeId?: number;
    subjectId?: number;
    price?: number;
  }): Promise<GradeSubject> => {
    const response = await myAxios.put(`/gradeSubjects/${id}`, payload);
    return response.data.data;
  },

  // Remove a subject from a grade
  removeGradeSubject: async (id: number): Promise<GradeSubject> => {
    const response = await myAxios.delete(`/gradeSubjects/${id}`);
    return response.data.data; // return deleted record
  },
};

export default gradeSubjectService;
export type { GradeSubject };
