import myAxios from "./apiServices";
import { Subject } from "@/types/subject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const subjectService = {
  // Create a new subject
  createSubject: async (name: string): Promise<Subject> => {
    try {
      const response = await myAxios.post(`${API_BASE_URL}/subjects`, { name });
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to create subject" };
    }
  },

  // Get all subjects
  getAllSubjects: async (): Promise<Subject[]> => {
    try {
      const response = await myAxios.get(`${API_BASE_URL}/subjects`);
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to fetch subjects" };
    }
  },

  // Get subject by ID
  getSubjectById: async (id: number): Promise<Subject> => {
    try {
      const response = await myAxios.get(`${API_BASE_URL}/subjects/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to fetch subject" };
    }
  },

  // Update subject
  updateSubject: async (id: number, name: string): Promise<Subject> => {
    try {
      const response = await myAxios.put(`${API_BASE_URL}/subjects/${id}`, { name });
      return response.data.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to update subject" };
    }
  },

  // Delete subject
  deleteSubject: async (id: number): Promise<void> => {
    try {
      await myAxios.delete(`${API_BASE_URL}/subjects/${id}`);
    } catch (error: any) {
      throw error.response?.data || { message: "Failed to delete subject" };
    }
  },
};

export default subjectService;
export type { Subject };
