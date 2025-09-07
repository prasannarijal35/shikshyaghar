// services/teacherService.ts
import { Teacher } from "@/types/teacher";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

interface TeacherFilters {
  gender?: string;
  experience?: number;
  gradeId?: number;
  subjectId?: number;
}

const teacherService = {
  // Fetch all teachers with optional filters
  getAllTeachers: async (filters: TeacherFilters = {}): Promise<Teacher[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers`, {
        params: filters, // send filters as query params
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return [];
    }
  },

  // Fetch single teacher by slug
  getTeacherBySlug: async (slug: string): Promise<Teacher | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers/slug/${slug}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Error fetching teacher with slug ${slug}:`, error);
      return null;
    }
  },
};

export default teacherService;
