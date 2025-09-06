import { useState, useEffect, useCallback } from "react";
import liveClassService from "@/services/liveClassServices";
import { LiveClass } from "@/types/teacher/class";
import { TeacherSubjectWithDetails } from "@/types/teacherSubject";

export const useLiveClassFull = (token: string) => {
  const [teacherSubjects, setTeacherSubjects] = useState<
    TeacherSubjectWithDetails[]
  >([]);
  const [teacherClasses, setTeacherClasses] = useState<LiveClass[]>([]);
  const [studentClasses, setStudentClasses] = useState<LiveClass[]>([]);
  const [allClasses, setAllClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (fn: () => Promise<any>, setter: (data: any) => void) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fn();
        setter(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchTeacherSubjects = useCallback(
    () =>
      fetchWrapper(
        () => liveClassService.getTeacherSubjects(token),
        setTeacherSubjects
      ),
    [token, fetchWrapper]
  );

  const fetchTeacherClasses = useCallback(
    () =>
      fetchWrapper(
        () => liveClassService.getTeacherLiveClasses(token),
        setTeacherClasses
      ),
    [token, fetchWrapper]
  );

  const fetchStudentClasses = useCallback(
    () =>
      fetchWrapper(
        () => liveClassService.getStudentLiveClasses(token),
        setStudentClasses
      ),
    [token, fetchWrapper]
  );

  const fetchAllClasses = useCallback(
    () =>
      fetchWrapper(
        () => liveClassService.getAllLiveClasses(token),
        setAllClasses
      ),
    [token, fetchWrapper]
  );

  const createLiveClass = useCallback(
    async (data: {
      teacherSubjectId: number;
      zoomLink?: string;
      startTime: string;
      duration: number;
    }) => {
      const result = await liveClassService.createLiveClass(token, data);
      fetchTeacherClasses();
      return result;
    },
    [token, fetchTeacherClasses]
  );

  const updateLiveClass = useCallback(
    async (
      id: number,
      data: Partial<{
        zoomLink?: string;
        startTime: string;
        duration: number;
        teacherSubjectId: number;
      }>
    ) => {
      const result = await liveClassService.updateLiveClass(token, id, data);
      fetchTeacherClasses();
      fetchAllClasses();
      return result;
    },
    [token, fetchTeacherClasses, fetchAllClasses]
  );

  const deleteLiveClass = useCallback(
    async (id: number) => {
      const result = await liveClassService.deleteLiveClass(token, id);
      fetchTeacherClasses();
      fetchAllClasses();
      return result;
    },
    [token, fetchTeacherClasses, fetchAllClasses]
  );

  // Now useEffect can safely include functions
  useEffect(() => {
    if (token) {
      fetchTeacherSubjects();
      fetchTeacherClasses();
      fetchStudentClasses();
      fetchAllClasses();
    }
  }, [
    token,
    fetchTeacherSubjects,
    fetchTeacherClasses,
    fetchStudentClasses,
    fetchAllClasses,
  ]);

  return {
    teacherSubjects,
    teacherClasses,
    studentClasses,
    allClasses,
    loading,
    error,
    fetchTeacherSubjects,
    fetchTeacherClasses,
    fetchStudentClasses,
    fetchAllClasses,
    createLiveClass,
    updateLiveClass,
    deleteLiveClass,
  };
};
