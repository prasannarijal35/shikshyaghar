import myAxios from "./apiServices";
import {
  CreateClassForm,
  TeacherSubjectsResponse,
} from "@/types/teacherSubject";

const BASE_URL = "/teacherSubjects";

export const TeacherSubjectService = {
  createAssignments: async (
    teacherId: number,
    assignments: CreateClassForm[]
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.post(BASE_URL, { teacherId, assignments });
    return response.data;
  },

  getAllAssignments: async (): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.get(BASE_URL);
    return response.data;
  },
  getAssignmentsByTeacher: async (
    teacherId: number
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.get(
      `${BASE_URL}/teacher/${teacherId}/details`
    );
    return response.data;
  },
  updateAssignment: async (
    id: number,
    data: Partial<CreateClassForm>
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },
  deleteAssignment: async (id: number): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default TeacherSubjectService;
