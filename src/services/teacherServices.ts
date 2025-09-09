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
};

export default teacherService;
