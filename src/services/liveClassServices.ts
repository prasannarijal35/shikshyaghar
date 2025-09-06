import axios from "axios";
import { LiveClass } from "@/types/teacher/class";
import { TeacherSubjectWithDetails } from "@/types/teacherSubject";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const liveClassService = {
  // Create a live class (teacher)
  createLiveClass: async (
    token: string,
    data: {
      teacherSubjectId: number;
      zoomLink?: string;
      startTime: string;
      duration: number;
    }
  ): Promise<LiveClass> => {
    const res = await axios.post(`${API_BASE_URL}/liveclasses/teacher`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Get live classes for logged-in teacher
  getTeacherLiveClasses: async (token: string): Promise<LiveClass[]> => {
    const res = await axios.get(`${API_BASE_URL}/liveclasses/teacher`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Get teacher subjects - ADD THIS METHOD
  getTeacherSubjects: async (
    token: string
  ): Promise<TeacherSubjectWithDetails[]> => {
    const res = await axios.get(`${API_BASE_URL}/teacher/subjects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Get live classes for student
  getStudentLiveClasses: async (token: string): Promise<LiveClass[]> => {
    const res = await axios.get(`${API_BASE_URL}/liveclasses/student`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Get all live classes (admin)
  getAllLiveClasses: async (token: string): Promise<LiveClass[]> => {
    const res = await axios.get(`${API_BASE_URL}/liveclasses/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Update live class (admin)
  updateLiveClass: async (
    token: string,
    id: number,
    data: Partial<{
      zoomLink?: string;
      startTime: string;
      duration: number;
      teacherSubjectId: number;
    }>
  ): Promise<LiveClass> => {
    const res = await axios.put(`${API_BASE_URL}/liveclasses/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  // Delete live class (admin)
  deleteLiveClass: async (
    token: string,
    id: number
  ): Promise<{ message: string }> => {
    const res = await axios.delete(`${API_BASE_URL}/liveclasses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};

export default liveClassService;
