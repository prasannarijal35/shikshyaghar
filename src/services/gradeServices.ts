import myAxios from "./apiServices";


export interface Grade {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

const gradeService = {

  getAllGrades: async (): Promise<Grade[]> => {
    const response = await myAxios.get("/grades");
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
