import axios from "axios";
import { TeacherSubjectWithDetails } from "@/types/teacherSubject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const teacherSubjectService = {
  getAllTeacherSubjects: async (): Promise<TeacherSubjectWithDetails[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacherSubject`);

      return response.data.data.map((item: any) => ({
        teacherSubjectId: item.id,
        teacherId: item.teacherId,
        gradeSubjectId: item.gradeSubjectId,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        teacher: item.teacher,
        gradeSubject: item.gradeSubject,
      }));
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      return [];
    }
  },

  getSubjectsByTeacherId: async (
    teacherId: number
  ): Promise<TeacherSubjectWithDetails[]> => {
    const all = await teacherSubjectService.getAllTeacherSubjects();
    return all.filter((item) => item.teacherId === teacherId);
  },
};

export default teacherSubjectService;
export type { TeacherSubjectWithDetails };
