import myAxios from "./apiServices";


export interface Grade {
  id: number;
  name: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

const gradeService = {
  // Fetch all grades
  getAllGrades: async (): Promise<Grade[]> => {
<<<<<<< Updated upstream
    try {
      const response = await axios.get(`${API_BASE_URL}/grades`);
      if (response.data.status === 200 || response.data.message) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch grades");
    } catch (error: any) {
      console.error("GradeService Error:", error);
      throw error;
    }
=======
    const response = await myAxios.get("/grades");
    return response.data.data;
  },

  // Create a new grade
  createGrade: async (name: string): Promise<Grade> => {
    const response = await myAxios.post("/grades", { name });
    return response.data.data;
  },

  // Update a grade
  updateGrade: async (id: number, name: string): Promise<Grade> => {
    const response = await myAxios.put(`/grades/${id}`, { name });
    return response.data.data;
  },

  // Delete a grade
  deleteGrade: async (id: number): Promise<void> => {
    await myAxios.delete(`/grades/${id}`);
>>>>>>> Stashed changes
  },
};

export default gradeService;
