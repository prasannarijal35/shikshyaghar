import axios from "axios";

// Grade type based on your API response
export interface Grade {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const gradeService = {
  getAllGrades: async (): Promise<Grade[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/grades`);
      if (response.data.status === 200) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to fetch grades");
      }
    } catch (error: any) {
      console.error("GradeService Error:", error);
      throw error;
    }
  },
};

export default gradeService;
