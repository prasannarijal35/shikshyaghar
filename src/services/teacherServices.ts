// services/teacherService.ts
import axios from "axios";

// TypeScript types
export interface TeacherDetails {
  id: number;
  userId: number;
  bio: string;
  experience: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  fullName: string;
  email: string;
  role: string;
  address: string;
  phone: string | null;
  gender: string | null;
  birthYear: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  teacher: TeacherDetails;
}

// Base API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

const teacherService = {
  // Fetch all teachers
  getAllTeachers: async (): Promise<Teacher[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers`);
      return response.data.data; // your backend wraps the array in "data"
    } catch (error) {
      console.error("Error fetching teachers:", error);
      return [];
    }
  },

  // Fetch single teacher by slug
  getTeacherBySlug: async (slug: string): Promise<Teacher | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teachers/slug/${slug}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Error fetching teacher with slug ${slug}:`, error);
      return null;
    }
  },
};

export default teacherService;
