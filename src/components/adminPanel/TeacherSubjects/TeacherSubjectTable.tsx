"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TeacherSubjectService from "@/services/teacherSubjectServices";
<<<<<<< Updated upstream
import { TeacherSubjectAssignment, TeacherSubjectsResponse } from "@/types/teacherSubject";

export default function TeacherSubjectTable() {
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubjectAssignment[]>([]);
=======
import {
  TeacherSubjectAssignment,
  TeacherSubjectsResponse,
} from "@/types/teacherSubject";
import { X, Trash2 } from "lucide-react";
import { DeleteConfirmationModal } from "@/components/common";

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 500;

export default function TeacherSubjectTable() {
  const [teacherSubjects, setTeacherSubjects] = useState<
    TeacherSubjectAssignment[]
  >([]);
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubject, setSelectedSubject] =
    useState<TeacherSubjectAssignment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteTarget, setDeleteTarget] =
    useState<TeacherSubjectAssignment | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch teacher-subject assignments
  const fetchData = async (pageNumber = 1, search = "") => {
    setLoading(true);
    try {
<<<<<<< Updated upstream
      setLoading(true);

      // Fetch all teacher subjects
      const response: TeacherSubjectsResponse = await TeacherSubjectService.getAllAssignments();

      // Set data
      setTeacherSubjects(response.data || []);
    } catch (error) {
=======
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
>>>>>>> Stashed changes
      toast.error("Failed to fetch teacher-subject data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, debouncedSearch);
  }, [page, debouncedSearch]);

  // Pagination handlers
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // Delete assignment
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

  // Compute status dynamically
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
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Teacher-Subject Overview
      </h1>

<<<<<<< Updated upstream
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left font-medium">S.N</th>
              <th className="py-4 px-4 text-left font-medium">Teacher Name</th>
              <th className="py-4 px-4 text-left font-medium">Grade-Subject</th>
              <th className="py-4 px-4 text-left font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {teacherSubjects.map((ts, index) => (
              <tr key={ts.id} className="border-t hover:bg-primary/10">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{ts.teacher?.user?.fullName || "N/A"}</td>
                <td className="py-4 px-4">
                  Grade {ts.gradeSubject?.grade?.name} - {ts.gradeSubject?.subject?.name}
                </td>
                <td className="py-4 px-4">{ts.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
=======
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by teacher, grade, or subject..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
>>>>>>> Stashed changes
      </div>

      {/* Loading / Empty State */}
      {loading ? (
        <p className="p-6 text-gray-500">Loading data...</p>
      ) : teacherSubjects.length === 0 ? (
        <p className="p-6 text-gray-500">No teacher-subject data found.</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow-md bg-white">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-4 text-left font-medium text-gray-700">
                    S.N
                  </th>
                  <th className="py-4 px-4 text-center font-medium text-gray-700">
                    Teacher Name
                  </th>
                  <th className="py-4 px-4 text-center font-medium text-gray-700">
                    Grade-Subject
                  </th>
                  <th className="py-4 px-4 text-right font-medium text-gray-700">
                    Price
                  </th>
                  <th className="py-4 px-4 text-right font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {teacherSubjects.map((ts, index) => (
                  <tr
                    key={ts.id}
                    className="border-t hover:bg-primary/10 transition-colors"
                  >
                    <td className="py-4 px-4 text-left">
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {ts.teacher?.user?.fullName || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-center">
                      Grade {ts.gradeSubject?.grade?.name || "N/A"} -{" "}
                      {ts.gradeSubject?.subject?.name || "N/A"}
                    </td>
                    <td className="py-4 px-4 text-right">Rs {ts.price ?? 0}</td>
                    <td className="py-4 px-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedSubject(ts)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setDeleteTarget(ts)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-gray-600">
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
            <button
              onClick={() => setSelectedSubject(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
            <p>
              <strong>Teacher:</strong>{" "}
              {selectedSubject.teacher?.user?.fullName || "N/A"}
            </p>
            <p>
              <strong>Grade:</strong>{" "}
              {selectedSubject.gradeSubject?.grade?.name || "N/A"}
            </p>
            <p>
              <strong>Subject:</strong>{" "}
              {selectedSubject.gradeSubject?.subject?.name || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> Rs {selectedSubject.price ?? 0}
            </p>
            <p>
              <strong>Duration:</strong> {selectedSubject.duration ?? "N/A"}{" "}
              mins
            </p>
            <p>
              <strong>Start Time:</strong> {selectedSubject.startTime || "N/A"}
            </p>
            <p>
              <strong>Meeting Link:</strong>{" "}
              {selectedSubject.meetingLink || "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedSubject.description || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {getStatus(selectedSubject)}
            </p>
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
