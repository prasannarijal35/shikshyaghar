import axios from "axios";
import { GradeSubject } from "@/types/gradeSubject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const gradeSubjectService = {
  // Fetch subjects by grade slug
  getSubjectsByGradeSlug: async (slug: string): Promise<GradeSubject[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/gradesubjects`);
      if (response.data.status === 200 || response.data.message) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Failed to fetch grade-subjects");
    } catch (error: any) {
      console.error("GradeSubjectService Error:", error);
      throw error;
    }
  },
};

export default gradeSubjectService;
