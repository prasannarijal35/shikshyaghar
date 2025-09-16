import myAxios from "./apiServices";
import { GradeSubject } from "@/types/gradeSubject";

const gradeSubjectService = {
  getAllGradeSubjects: async (search?: string): Promise<GradeSubject[]> => {
    const response = await myAxios.get("/gradeSubjects", {
      params: search ? { search } : {},
    });

    if (!response.data.data) throw new Error("No data returned");
    return response.data.data;
  },

  getGradeSubjectById: async (id: number): Promise<GradeSubject> => {
    const response = await myAxios.get(`/gradeSubjects/${id}`);
    if (!response.data.data) throw new Error("Record not found");
    return response.data.data;
  },

  getSubjectsByGradeSlug: async (slug: string): Promise<GradeSubject[]> => {
    const response = await myAxios.get(`/grades/slug/${slug}/subjects`);
    return response.data.data;
  },

  assignGradeSubject: async (payload: {
    gradeId: number;
    subjectId: number;
    price: number;
  }): Promise<GradeSubject> => {
    const response = await myAxios.post("/gradeSubjects", payload);
    return response.data.data;
  },

  updateGradeSubject: async (
    id: number,
    payload: {
      gradeId?: number;
      subjectId?: number;
      price?: number;
    }
  ): Promise<GradeSubject> => {
    const response = await myAxios.put(`/gradeSubjects/${id}`, payload);
    return response.data.data;
  },

  removeGradeSubject: async (id: number): Promise<GradeSubject> => {
    const response = await myAxios.delete(`/gradeSubjects/${id}`);
    return response.data.data;
  },
};

export default gradeSubjectService;
export type { GradeSubject };
