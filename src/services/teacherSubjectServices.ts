import myAxios from "./apiServices";
import { TeacherSubjectsResponse } from "@/types/teacherSubject";

interface CreateAssignmentInput {
  teacherId: number;
  assignments: {
    gradeSubjectId: number;
    price?: number;
    startTime: string;
    duration: number;
    meetinglink: string;
    description?: string;
  }[];
}

interface UpdateAssignmentInput {
  teacherId: number;
  assignments: {
    gradeSubjectId: number;
    price?: number;
    startTime: string;
    duration: number;
    meetinglink: string;
    description?: string;
  }[];
}

const teacherSubjectService = {
  // Create multiple teacher subjects
  create: async (
    data: CreateAssignmentInput
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.post("/teacherSubjects", data);
    return response.data;
  },

  // Get all teacher subjects
  getAll: async (): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.get("/teacherSubjects");
    return response.data;
  },

  // Get teacher subjects by teacherId with details
  getByTeacherId: async (
    teacherId: number
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.get(
      `/teacherSubjects/teacher/${teacherId}/details`
    );
    return response.data;
  },

  // Update teacher subjects
  update: async (
    teacherSubjectId: number,
    data: UpdateAssignmentInput
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.put(
      `/teacherSubjects/${teacherSubjectId}`,
      data
    );
    return response.data;
  },

  // Delete a teacher subject
  remove: async (
    teacherSubjectId: number
  ): Promise<TeacherSubjectsResponse> => {
    const response = await myAxios.delete(
      `/teacherSubjects/${teacherSubjectId}`
    );
    return response.data;
  },
};

export default teacherSubjectService;
