import { Grade } from "@/types/grade";
import myAxios from "./apiServices";

const gradeService = {
  getAllGrades: async (): Promise<Grade[]> => {
    const response = await myAxios.get("/grades");
    return response.data.data;
  },

  getGradeById: async (id: number): Promise<Grade> => {
    const response = await myAxios.get(`/grades/${id}`);
    return response.data.data;
  },

  getGradeBySlug: async (slug: string): Promise<Grade> => {
    const response = await myAxios.get(`/grades/slug/${slug}`);
    return response.data.data;
  },
    
  createGrade: async (name: string): Promise<Grade> => {
    const response = await myAxios.post("/grades", { name });
    return response.data.data;
  },

  updateGrade: async (id: number, name: string): Promise<Grade> => {
    const response = await myAxios.put(`/grades/${id}`, { name });
    return response.data.data;
  },

  deleteGrade: async (id: number): Promise<void> => {
    await myAxios.delete(`/grades/${id}`);
  },
};
export default gradeService;
