import { useState } from "react";
import teacherSubjectService from "@/services/teacherSubjectServices";
import { TeacherSubjectsResponse } from "@/types/teacherSubject";

interface AssignmentInput {
  gradeSubjectId: number;
  price?: number;
  startTime: string;
  duration: number;
  meetinglink: string;
  description?: string;
}

interface CreateAssignmentInput {
  teacherId: number;
  assignments: AssignmentInput[];
}

interface UpdateAssignmentInput {
  teacherId: number;
  assignments: AssignmentInput[];
}

interface UseCreateTeacherSubjectReturn {
  createTeacherSubject: (
    data: CreateAssignmentInput
  ) => Promise<TeacherSubjectsResponse | null>;
  updateTeacherSubject: (
    teacherSubjectId: number,
    data: UpdateAssignmentInput
  ) => Promise<TeacherSubjectsResponse | null>;
  isLoading: boolean;
  error: string | null;
}

export const useCreateTeacherSubject = (): UseCreateTeacherSubjectReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTeacherSubject = async (
    data: CreateAssignmentInput
  ): Promise<TeacherSubjectsResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await teacherSubjectService.create(data);
      setIsLoading(false);
      return response;
    } catch (err: any) {
      console.error("Create TeacherSubject error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
      setIsLoading(false);
      return null;
    }
  };

  const updateTeacherSubject = async (
    teacherSubjectId: number,
    data: UpdateAssignmentInput
  ): Promise<TeacherSubjectsResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await teacherSubjectService.update(
        teacherSubjectId,
        data
      );
      setIsLoading(false);
      return response;
    } catch (err: any) {
      console.error("Update TeacherSubject error:", err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
      setIsLoading(false);
      return null;
    }
  };

  return { createTeacherSubject, updateTeacherSubject, isLoading, error };
};
