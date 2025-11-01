"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Check,
  X,
  Clock,
  FileText,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useAttendanceService from "@/services/attendanceServices";
import {
  AttendanceStatus,
  StudentAttendanceSummary,
  BulkAttendanceItem,
} from "@/types/attendance";

interface TeacherAttendanceProps {
  teacherSubjectId: number;
  subjectName: string;
}

export default function TeacherAttendance({
  teacherSubjectId,
  subjectName,
}: TeacherAttendanceProps) {
  const [students, setStudents] = useState<StudentAttendanceSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceData, setAttendanceData] = useState<
    Map<number, AttendanceStatus>
  >(new Map());
  const [remarks, setRemarks] = useState<Map<number, string>>(new Map());
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  const attendanceService = useAttendanceService();

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherSubjectId]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await attendanceService.getClassAttendance(teacherSubjectId);
      setStudents(data.students);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (
    subscriptionId: number,
    status: AttendanceStatus
  ) => {
    setAttendanceData(new Map(attendanceData.set(subscriptionId, status)));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const newData = new Map<number, AttendanceStatus>();
    students.forEach((student) => {
      newData.set(student.subscriptionId, status);
    });
    setAttendanceData(newData);
  };

  const handleSubmitAttendance = async () => {
    if (attendanceData.size === 0) {
      toast.error("Please mark attendance for at least one student");
      return;
    }

    try {
      setMarking(true);

      const attendances: BulkAttendanceItem[] = Array.from(
        attendanceData.entries()
      ).map(([subscriptionId, status]) => ({
        subscriptionId,
        status,
        remarks: remarks.get(subscriptionId),
      }));

      const result = await attendanceService.bulkMarkAttendance({
        teacherSubjectId,
        attendanceDate: selectedDate,
        attendances,
      });

      toast.success(
        `Attendance marked: ${result.successful} successful, ${result.failed} failed`
      );

      // Clear selections
      setAttendanceData(new Map());
      setRemarks(new Map());

      // Refresh student data
      await fetchStudents();
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        toast.error("You don't have permission to mark attendance");
      } else if (error?.response?.status === 400) {
        toast.error(
          error?.response?.data?.message || "Invalid attendance data"
        );
      } else {
        toast.error("Failed to mark attendance");
      }
    } finally {
      setMarking(false);
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 border-green-300";
      case "absent":
        return "bg-red-100 text-red-800 border-red-300";
      case "late":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "excused":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Check className="w-4 h-4" />;
      case "absent":
        return <X className="w-4 h-4" />;
      case "late":
        return <Clock className="w-4 h-4" />;
      case "excused":
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Attendance Management
                </h1>
                <p className="text-gray-600">{subjectName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-semibold text-gray-900">
                {students.length} Students
              </span>
            </div>
          </div>

          {/* Date Selector and Quick Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex-1"></div>

            <div className="flex gap-2">
              <button
                onClick={() => handleMarkAll("present")}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                All Present
              </button>
              <button
                onClick={() => handleMarkAll("absent")}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                All Absent
              </button>
            </div>
          </div>
        </div>

        {/* Students List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Students Found
            </h2>
            <p className="text-gray-600">
              No students are enrolled in this subject yet.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Email
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Attendance Rate
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Mark Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr
                        key={student.subscriptionId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {student.student.fullName}
                          </div>
                          {student.student.phone && (
                            <div className="text-sm text-gray-500">
                              {student.student.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {student.student.email}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <div className="relative w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                                style={{
                                  width: `${student.attendanceSummary.attendanceRate}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {student.attendanceSummary.attendanceRate.toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {(
                              [
                                "present",
                                "absent",
                                "late",
                                "excused",
                              ] as AttendanceStatus[]
                            ).map((status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  handleStatusChange(
                                    student.subscriptionId,
                                    status
                                  )
                                }
                                className={`px-3 py-1 rounded-lg border-2 text-xs font-medium transition-all ${
                                  attendanceData.get(student.subscriptionId) ===
                                  status
                                    ? getStatusColor(status)
                                    : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"
                                }`}
                                title={
                                  status.charAt(0).toUpperCase() +
                                  status.slice(1)
                                }
                              >
                                {getStatusIcon(status)}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              setExpandedStudent(
                                expandedStudent === student.subscriptionId
                                  ? null
                                  : student.subscriptionId
                              )
                            }
                            className="text-green-600 hover:text-green-700 transition-colors"
                          >
                            {expandedStudent === student.subscriptionId ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmitAttendance}
                disabled={marking || attendanceData.size === 0}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
              >
                {marking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Marking Attendance...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Submit Attendance ({attendanceData.size} students)
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
