"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import {
  TeacherSubjectAssignment,
  TeacherSubjectsResponse,
} from "@/types/teacherSubject";
import {
  X,
  Trash2,
  Search,
  School,
  SquareDashedKanban,
  Eye,
} from "lucide-react";
import { DeleteConfirmationModal } from "@/components/common";

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

export default function TeacherSubjectTable() {
  const [teacherSubjects, setTeacherSubjects] = useState<
    TeacherSubjectAssignment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubject, setSelectedSubject] =
    useState<TeacherSubjectAssignment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteTarget, setDeleteTarget] =
    useState<TeacherSubjectAssignment | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchData = async (pageNumber = 1, search = "") => {
    setLoading(true);
    try {
      const res: TeacherSubjectsResponse =
        await TeacherSubjectService.getAllTeacherSubjects(
          pageNumber,
          PAGE_SIZE,
          search
        );
      setTeacherSubjects(res?.data?.items || []);
      setTotalPages(res?.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch teacher-subject data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await TeacherSubjectService.deleteAssignment(deleteTarget.id);
      toast.success("Assignment deleted successfully");
      fetchData(page, debouncedSearch);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete assignment");
    }
  };

  const getStatus = (ts: TeacherSubjectAssignment) => {
    if (!ts.startTime || !ts.duration) return "N/A";
    const [hours, minutes, seconds] = ts.startTime.split(":").map(Number);
    const now = new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds || 0
    );
    const end = new Date(start.getTime() + ts.duration * 60000);
    return now < start ? "Upcoming" : now > end ? "Completed" : "Live";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Header with Add Button and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teacher-Subject Overview
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              View and manage all teacher assignments
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-[250px] bg-gray-100/70 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading assignments...
          </p>
        </div>
      ) : teacherSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] px-6 py-12 relative">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <SquareDashedKanban className="w-16 h-16 text-blue-500" />
            </div>
          </div>
          <div className="text-center space-y-6 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No Assignments Found
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              It looks like no subjects have been assigned to teachers yet. Use
              the &quot;Add Assignment&quot; button to get started.
            </p>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      S.N
                    </th>
                    <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Teacher Name
                    </th>
                    <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Grade-Subject
                    </th>
                    <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teacherSubjects.map((ts, index) => (
                    <tr
                      key={ts.id}
                      className="hover:bg-blue-50/50 transition-all duration-200 group"
                    >
                      <td className="py-6 px-6 text-gray-900 font-medium">
                        {(page - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="inline-flex px-4 py-2 rounded-full text-base font-medium bg-purple-100 text-purple-800">
                          {ts.teacher?.user?.fullName || "N/A"}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-center">
                        <span className="inline-flex px-4 py-2 rounded-full text-base font-medium bg-blue-100 text-blue-800">
                          Grade {ts.gradeSubject?.grade?.name || "N/A"} -{" "}
                          {ts.gradeSubject?.subject?.name || "N/A"}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-right">
                        <span className="inline-flex px-4 py-2 rounded-full text-base font-medium bg-gray-100 text-gray-800">
                          Rs {ts.price ?? 0}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedSubject(ts)}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => setDeleteTarget(ts)}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <p className="text-gray-600 font-medium">
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Detail Modal */}

      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative transform scale-100 opacity-100 transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSubject(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center mb-6 space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <School className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Assignment Details
              </h2>
            </div>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teacher */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  Teacher
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.teacher?.user?.fullName || "N/A"}
                </p>
              </div>

              {/* Grade */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-purple-700 mb-1">
                  Grade
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.gradeSubject?.grade?.name || "N/A"}
                </p>
              </div>

              {/* Subject */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  Subject
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.gradeSubject?.subject?.name || "N/A"}
                </p>
              </div>

              {/* Price */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-purple-700 mb-1">
                  Price
                </h3>
                <p className="font-medium text-gray-800">
                  Rs {selectedSubject.price ?? 0}
                </p>
              </div>

              {/* Duration */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  Duration
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.duration ?? "N/A"} mins
                </p>
              </div>

              {/* Start Time */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
                <h3 className="text-sm font-semibold text-purple-700 mb-1">
                  Start Time
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.startTime || "N/A"}
                </p>
              </div>

              {/* Meeting Link */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50 col-span-1 md:col-span-2">
                <h3 className="text-sm font-semibold text-blue-700 mb-1">
                  Meeting Link
                </h3>
                <a
                  href={selectedSubject.meetingLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-500 hover:underline"
                >
                  {selectedSubject.meetingLink || "N/A"}
                </a>
              </div>

              {/* Description */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50 col-span-1 md:col-span-2">
                <h3 className="text-sm font-semibold text-purple-700 mb-1">
                  Description
                </h3>
                <p className="font-medium text-gray-800">
                  {selectedSubject.description || "N/A"}
                </p>
              </div>

              {/* Status */}
              <div className="p-4 border rounded-xl shadow-sm bg-gray-50 col-span-1 md:col-span-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-blue-700">Status</h3>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    getStatus(selectedSubject) === "Live"
                      ? "bg-green-100 text-green-800"
                      : getStatus(selectedSubject) === "Upcoming"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {getStatus(selectedSubject)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Assignment"
        description={`Are you sure you want to delete assignment "${deleteTarget?.gradeSubject?.subject?.name}"?`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
