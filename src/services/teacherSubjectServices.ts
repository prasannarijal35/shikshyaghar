<<<<<<< Updated upstream
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
=======
// services/teacherSubjectService.ts
import myAxios from "./apiServices";

export interface TeacherSubjectWithDetails {
  teacherSubjectId: number;
  teacherId: number;
  gradeSubjectId: number;
  price: number;
  startTime: string;
  duration: number;
  meetinglink: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  teacher?: any;        // include teacher details if needed
  gradeSubject?: any;   // include gradeSubject details if needed
}

const teacherSubjectService = {
  // Fetch all teacher-subjects
  getAllTeacherSubjects: async (): Promise<TeacherSubjectWithDetails[]> => {
    const response = await myAxios.get("/teacherSubjects");
    return response.data.data.map((item: any) => ({
      teacherSubjectId: item.id,
      teacherId: item.teacherId,
      gradeSubjectId: item.gradeSubjectId,
      price: item.price,
      startTime: item.startTime,
      duration: item.duration,
      meetinglink: item.meetinglink,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      teacher: item.teacher,
      gradeSubject: item.gradeSubject,
    }));
  },

  // Fetch a single teacher-subject by ID
  getById: async (id: number): Promise<TeacherSubjectWithDetails | null> => {
    const response = await myAxios.get(`/teacherSubjects/${id}`);
    const item = response.data.data;
    return {
      teacherSubjectId: item.id,
      teacherId: item.teacherId,
      gradeSubjectId: item.gradeSubjectId,
      price: item.price,
      startTime: item.startTime,
      duration: item.duration,
      meetinglink: item.meetinglink,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      teacher: item.teacher,
      gradeSubject: item.gradeSubject,
    };
  },

  // Create new teacher-subject assignment(s)
  create: async (payload: {
    teacherId: number;
    assignments: {
      gradeSubjectId: number;
      price?: number;
      startTime?: string;
      duration?: number;
      meetinglink?: string;
      description?: string;
    }[];
  }): Promise<TeacherSubjectWithDetails[]> => {
    const response = await myAxios.post("/teacherSubjects", payload);
    return response.data.data;
  },

  // Update a teacher-subject by ID
  update: async (
    id: number,
    payload: {
      gradeSubjectId?: number;
      price?: number;
      startTime?: string;
      duration?: number;
      meetinglink?: string;
      description?: string;
    }
  ): Promise<TeacherSubjectWithDetails> => {
    const response = await myAxios.put(`/teacherSubjects/${id}`, payload);
    return response.data.data;
  },

  // Delete a teacher-subject by ID
  remove: async (id: number): Promise<void> => {
    await myAxios.delete(`/teacherSubjects/${id}`);
  },

  // Get all assignments for a specific teacher
  getByTeacherId: async (teacherId: number): Promise<TeacherSubjectWithDetails[]> => {
    const response = await myAxios.get(`/teacherSubjects/teacher/${teacherId}`);
    return response.data.data.map((item: any) => ({
      teacherSubjectId: item.id,
      teacherId: item.teacherId,
      gradeSubjectId: item.gradeSubjectId,
      price: item.price,
      startTime: item.startTime,
      duration: item.duration,
      meetinglink: item.meetinglink,
      description: item.description,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      teacher: item.teacher,
      gradeSubject: item.gradeSubject,
    }));
>>>>>>> Stashed changes
  },
};

export default teacherSubjectService;
