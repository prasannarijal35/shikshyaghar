"use client";
import myAxios from "@/services/apiServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ViewStudentModal from "./ViewStudentModal";
import { DeleteConfirmationModal } from "@/components/common";
import { User, UserPlus, UserCheck } from "lucide-react";

const PAGE_SIZE = 10;

export default function StudentManagementTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewStudent, setViewStudent] = useState<any | null>(null);
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);
  const [deleteStudentName, setDeleteStudentName] = useState<string>("");

  // Fetch students from backend with pagination
  const fetchStudents = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await myAxios.get("/admin/students", {
        params: { page: pageNumber, limit: PAGE_SIZE },
      });
      setStudents(res.data.data.items || []);
      setTotalPages(res.data.data.pagination.totalPages || 1);
    } catch (error: any) {
      toast.error(`Failed to fetch students: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(page);
  }, [page]);

  // Delete student
  const handleDelete = async () => {
    if (!deleteStudentId) return;
    try {
      await myAxios.delete(`/admin/students/${deleteStudentId}`);
      toast.success("Student deleted successfully");
      setDeleteStudentId(null);
      fetchStudents(page);
    } catch (error: any) {
      toast.error(
        `Failed to delete student: ${error?.message || "Unknown error"}`
      );
    }
  };

  // Pagination controls
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              View, manage, and delete student records
            </p>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading students...
          </p>
        </div>
      ) : students.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center min-h-[500px] px-6 py-12 relative">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <UserCheck className="w-16 h-16 text-blue-500" />
            </div>
          </div>
          <div className="text-center space-y-6 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No students found
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Students will appear here once they are added to the system.
            </p>
            <button
              onClick={() => toast("Add student functionality not implemented")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="w-5 h-5 mr-3" />
              Add First Student
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Student Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Birth Year
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student: any) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/50 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {student.fullName}
                    </td>
                    <td className="py-4 px-6">{student.email}</td>
                    <td className="py-4 px-6">{student.grade || "-"}</td>
                    <td className="py-4 px-6">{student.gender || "-"}</td>
                    <td className="py-4 px-6">{student.birthYear || "-"}</td>
                    <td className="py-4 px-6 flex justify-center gap-2">
                      <button
                        onClick={() => setViewStudent(student)}
                        className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      >
                        <FiEye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => {
                          setDeleteStudentId(student.id);
                          setDeleteStudentName(student.fullName);
                        }}
                        className="flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-gray-600 font-medium">
              Page {page} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      <ViewStudentModal
        isOpen={!!viewStudent}
        onClose={() => setViewStudent(null)}
        student={viewStudent}
      />
      <DeleteConfirmationModal
        isOpen={!!deleteStudentId}
        onClose={() => setDeleteStudentId(null)}
        onConfirm={handleDelete}
        title="Delete Student"
        description={`Are you sure you want to delete ${deleteStudentName}?`}
      />
    </main>
  );
}
