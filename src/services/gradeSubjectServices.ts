import axios from "axios";
import { GradeSubject } from "@/types/gradeSubject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const gradeSubjectService = {
  getSubjectsByGradeSlug: async (slug: string): Promise<GradeSubject[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/gradeSubjects`);
      if (!response.data.data) throw new Error("No data returned");

      // Filter gradeSubjects by slug
      const filtered = response.data.data.filter(
        (gs: GradeSubject) => gs.grade.name === slug
      );
      return filtered;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("GradeSubjectService Error:", error);
      throw error;
    }
  },
};

export default gradeSubjectService;
