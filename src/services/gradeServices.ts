import axios from "axios";
import { Grade } from "@/types/grade";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const gradeService = {
  getAllGrades: async (): Promise<Grade[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/grades`);
      if (response.data.status === 200 || response.data.message) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch grades");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("GradeService Error:", error);
      throw error;
    }
  },
};

export default gradeService;
export type { Grade };
