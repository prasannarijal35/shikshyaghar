"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  TrendingUp,
  Check,
  X,
  Clock,
  FileText,
  Loader2,
  Filter,
  BarChart3,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useAttendanceService from "@/services/attendanceServices";
import {
  AttendanceBySubscriptionResponse,
  AttendanceStatus,
} from "@/types/attendance";

interface StudentAttendanceProps {
  subscriptionId: number;
  subjectName: string;
}

export default function StudentAttendance({
  subscriptionId,
  subjectName,
}: StudentAttendanceProps) {
  const [attendanceData, setAttendanceData] =
    useState<AttendanceBySubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const attendanceService = useAttendanceService();

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  const fetchAttendance = async (filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }) => {
    try {
      setLoading(true);
      const data = await attendanceService.getAttendanceBySubscription(
        subscriptionId,
        filters
      );
      setAttendanceData(data);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    const filters: { startDate?: string; endDate?: string; status?: string } =
      {};
    if (dateRange.startDate) filters.startDate = dateRange.startDate;
    if (dateRange.endDate) filters.endDate = dateRange.endDate;
    if (filterStatus) filters.status = filterStatus;

    fetchAttendance(filters);
  };

  const handleClearFilters = () => {
    setDateRange({ startDate: "", endDate: "" });
    setFilterStatus("");
    fetchAttendance();
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
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Attendance
              </h1>
              <p className="text-gray-600">{subjectName}</p>
            </div>
          </div>
        </div>

        {loading && !attendanceData ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : attendanceData ? (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <span className="text-2xl font-bold text-gray-900">
                    {attendanceData.statistics.total}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Total Days</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Check className="w-5 h-5" />
                  <span className="text-2xl font-bold">
                    {attendanceData.statistics.present}
                  </span>
                </div>
                <p className="text-sm opacity-90">Present</p>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <X className="w-5 h-5" />
                  <span className="text-2xl font-bold">
                    {attendanceData.statistics.absent}
                  </span>
                </div>
                <p className="text-sm opacity-90">Absent</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-bold">
                    {attendanceData.statistics.late}
                  </span>
                </div>
                <p className="text-sm opacity-90">Late</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-2xl font-bold">
                    {attendanceData.statistics.attendanceRate.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm opacity-90">Attendance Rate</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              </div>
              <div className="flex flex-wrap gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, startDate: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, endDate: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleApplyFilters}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Attendance Records
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {attendanceData.attendances.length} records found
                </p>
              </div>

              {attendanceData.attendances.length === 0 ? (
                <div className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No attendance records found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Date
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Remarks
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Marked By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {attendanceData.attendances.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {formatDate(record.attendanceDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border-2 text-sm font-medium ${getStatusColor(
                                  record.status
                                )}`}
                              >
                                {getStatusIcon(record.status)}
                                {record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {record.remarks || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {record.marker?.fullName || "Unknown"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
