import axios from "axios";
import { TeacherSubjectWithDetails } from "@/types/teacherSubject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const teacherSubjectService = {
  // ✅ Fetch all teacher-subjects
  getAllTeacherSubjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teacherSubjects`);

      return response.data.data.map((item: any) => ({
        id: item.id, // keep it consistent with TeacherDetails usage
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

  // ✅ Fetch subjects for a single teacher
  getByTeacherId: async (
    teacherId: number
  ): Promise<TeacherSubjectWithDetails[]> => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/teacherSubject/teacher/${teacherId}`
      );

      return response.data.data.map((item: any) => ({
        id: item.id,
        teacherId: item.teacherId,
        gradeSubjectId: item.gradeSubjectId,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        teacher: item.teacher,
        gradeSubject: item.gradeSubject,
      }));
    } catch (error) {
      console.error(`Error fetching subjects for teacher ${teacherId}:`, error);
      return [];
    }
  },
};

export default teacherSubjectService;
export type { TeacherSubjectWithDetails };
