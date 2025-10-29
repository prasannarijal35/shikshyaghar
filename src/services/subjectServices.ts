import myAxios from "./apiServices";
import { Subject } from "@/types/subject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const subjectService = {
  createSubject: async (name: string): Promise<Subject> => {
    const response = await myAxios.post(`${API_BASE_URL}/subjects`, { name });
    return response.data.data;
  },

  getAllSubjects: async (): Promise<Subject[]> => {
    const response = await myAxios.get(`${API_BASE_URL}/subjects`);
    return response.data.data;
  },

  getPaginatedSubjects: async (
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<{
    items: Subject[];
    pagination: { total: number; page: number; limit: number; totalPages: number };
  }> => {
    const params: Record<string, any> = { page, limit, search };
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    const response = await myAxios.get(`${API_BASE_URL}/subjects/paginated`, {
      params,
    });
    return response.data.data;
  },

  getSubjectById: async (id: number): Promise<Subject> => {
    const response = await myAxios.get(`${API_BASE_URL}/subjects/${id}`);
    return response.data.data;
  },

  updateSubject: async (id: number, name: string): Promise<Subject> => {
    const response = await myAxios.put(`${API_BASE_URL}/subjects/${id}`, { name });
    return response.data.data;
  },

  deleteSubject: async (id: number): Promise<void> => {
    await myAxios.delete(`${API_BASE_URL}/subjects/${id}`);
  },
};

export default subjectService;
export type { Subject };
