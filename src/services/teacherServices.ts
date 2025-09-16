import myAxios from "./apiServices";
import { Teacher } from "@/types/teacher";

interface GetTeachersFilters {
  gender?: string;
  experience?: number;
  gradeId?: number;
  subjectId?: number;
}

const teacherService = {
  getAllTeachers: async (filters?: GetTeachersFilters): Promise<Teacher[]> => {
    const res = await myAxios.get("/teachers", { params: filters });
    return res.data.data as Teacher[];
  },

  getTeacherBySlug: async (slug: string): Promise<Teacher> => {
    const res = await myAxios.get(`/teachers/slug/${slug}`);
    return res.data.data as Teacher;
  },

  getTeacherById: async (id: number): Promise<Teacher> => {
    const res = await myAxios.get(`/teachers/${id}`);
    return res.data.data as Teacher;
  },

  getTeacherProfileById: async (): Promise<Teacher> => {
    const res = await myAxios.get(`/teachers/me`);
    return res.data.data as Teacher;
  },

  updateTeacherProfile: async (form: FormData): Promise<Teacher> => {
    const res = await myAxios.put(`/teachers/me`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data as Teacher;
  },
};

export default teacherService;
