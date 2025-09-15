import myAxios from "@/services/apiServices";
import {
  CreateClassForm,
  TeacherSubjectsResponse,
} from "@/types/teacherSubject";

const TeacherSubjectService = {
  /**
   * Get all teacher subjects (admin/global)
   */
  getAllTeacherSubjects: async (
    page?: number,
    limit?: number,
    search?: string
  ): Promise<TeacherSubjectsResponse> => {
    try {
      const params: Record<string, any> = { page, limit, search };
      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );

      const response = await myAxios.get<TeacherSubjectsResponse>(
        "/teacherSubjects",
        {
          params,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching teacher subjects:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch teacher subjects"
      );
    }
  },

  /**
   * Get teacher subjects for a specific teacher
   */
  getAssignmentsByTeacher: async (
    teacherId: number,
    page?: number,
    limit?: number
  ): Promise<TeacherSubjectsResponse> => {
    try {
      const params: Record<string, any> = { page, limit };
      const response = await myAxios.get<TeacherSubjectsResponse>(
        `/teacherSubjects/teacher/${teacherId}/details`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching teacher assignments:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch assignments"
      );
    }
  },

  /**
   * Create new teacher subject(s)
   */
  createAssignment: async (payload: CreateClassForm) => {
    try {
      const response = await myAxios.post("/teacherSubjects", payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating assignment:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to create assignment"
      );
    }
  },

  /**
   * Update teacher subject
   */
  updateAssignment: async (id: number, payload: CreateClassForm) => {
    try {
      const response = await myAxios.put(`/teacherSubjects/${id}`, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error updating assignment:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to update assignment"
      );
    }
  },

  /**
   * Delete teacher subject
   */
  deleteAssignment: async (id: number) => {
    try {
      const response = await myAxios.delete(`/teacherSubjects/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting assignment:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to delete assignment"
      );
    }
  },
  getAssignmentById: async (id: number) => {
    try {
      const response = await myAxios.get(`/teacherSubjects/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching teacher subject by ID:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch teacher subject"
      );
    }
  },
};

export default TeacherSubjectService;
