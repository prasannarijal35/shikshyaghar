// src/services/attendanceServices.ts
"use client";
import myAxios from "./apiServices";
import {
  Attendance,
  MarkAttendancePayload,
  BulkMarkAttendancePayload,
  BulkMarkAttendanceResponse,
  AttendanceBySubscriptionResponse,
  ClassAttendanceResponse,
} from "@/types/attendance";

const useAttendanceService = () => {
  /**
   * Mark or update attendance for a single student
   * @param payload - Attendance details
   * @returns The created or updated attendance record
   */
  const markAttendance = async (
    payload: MarkAttendancePayload
  ): Promise<{ attendance: Attendance; created: boolean }> => {
    try {
      const response = await myAxios.post("/attendance/mark", payload);
      console.log("markAttendance response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "markAttendance error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  /**
   * Bulk mark attendance for multiple students
   * @param payload - Bulk attendance details
   * @returns Summary of successful and failed operations
   */
  const bulkMarkAttendance = async (
    payload: BulkMarkAttendancePayload
  ): Promise<BulkMarkAttendanceResponse> => {
    try {
      const response = await myAxios.post("/attendance/bulk", payload);
      console.log("bulkMarkAttendance response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "bulkMarkAttendance error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  /**
   * Get attendance records for a specific subscription
   * @param subscriptionId - The subscription ID
   * @param filters - Optional filters (startDate, endDate, status)
   * @returns Attendance records with statistics
   */
  const getAttendanceBySubscription = async (
    subscriptionId: number,
    filters?: {
      startDate?: string;
      endDate?: string;
      status?: string;
    }
  ): Promise<AttendanceBySubscriptionResponse> => {
    try {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);
      if (filters?.status) params.append("status", filters.status);

      const queryString = params.toString();
      const url = `/attendance/subscription/${subscriptionId}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await myAxios.get(url);
      console.log("getAttendanceBySubscription response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "getAttendanceBySubscription error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  /**
   * Get all students' attendance for a teacher's subject
   * @param teacherSubjectId - The teacher subject ID
   * @returns Class-wide attendance overview
   */
  const getClassAttendance = async (
    teacherSubjectId: number
  ): Promise<ClassAttendanceResponse> => {
    try {
      const response = await myAxios.get(
        `/attendance/teacher-subject/${teacherSubjectId}`
      );
      console.log("getClassAttendance response:", response.data);
      return response.data.data;
    } catch (error: any) {
      console.error(
        "getClassAttendance error:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return {
    markAttendance,
    bulkMarkAttendance,
    getAttendanceBySubscription,
    getClassAttendance,
  };
};

export default useAttendanceService;
