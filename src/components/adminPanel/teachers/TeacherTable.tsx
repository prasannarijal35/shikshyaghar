/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import myAxios from "@/services/apiServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ViewTeacherModal from "../teacherverification/ViewTeacherModel";
import { DeleteConfirmationModal } from "@/components/common";
import { UserCircle } from "lucide-react";

const PAGE_SIZE = 10;

export default function TeacherManagementTable() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewTeacher, setViewTeacher] = useState<any | null>(null);
  const [deleteTeacherId, setDeleteTeacherId] = useState<number | null>(null);
  const [deleteTeacherName, setDeleteTeacherName] = useState<string>("");

  // Fetch teachers from backend with pagination
  const fetchTeachers = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await myAxios.get("/admin/teachers", {
        params: { page: pageNumber, limit: PAGE_SIZE },
      });
      setTeachers(res.data.data.items || []);
      setTotalPages(res.data.data.pagination.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(page);
  }, [page]);

  // Delete teacher
  const handleDelete = async () => {
    if (!deleteTeacherId) return;
    try {
      await myAxios.delete(`/admin/teachers/${deleteTeacherId}`);
      toast.success("Teacher deleted successfully");
      setDeleteTeacherId(null);
      fetchTeachers(page);
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  // Pagination controls
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <UserCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teacher Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage teachers and their details efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12 relative">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <UserCircle className="w-16 h-16 text-blue-500" />
            </div>
          </div>
          <div className="text-center space-y-4 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800">No Teachers Found</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Teachers you add here will appear in the management table.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Qualification</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-blue-50/50 transition-all duration-200 group">
                    <td className="py-6 px-6 text-gray-900 font-medium">{teacher.fullName}</td>
                    <td className="py-6 px-6">{teacher.email}</td>
                    <td className="py-6 px-6">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                        {teacher.qualification || "-"}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                        {teacher.status || "-"}
                      </span>
                    </td>
                    <td className="py-6 px-6 flex justify-end gap-2">
                      <button
                        onClick={() => setViewTeacher(teacher)}
                        className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      >
                        <FiEye className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTeacherId(teacher.id);
                          setDeleteTeacherName(teacher.fullName);
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
      <ViewTeacherModal isOpen={!!viewTeacher} onClose={() => setViewTeacher(null)} teacher={viewTeacher} />
      <DeleteConfirmationModal
        isOpen={!!deleteTeacherId}
        onClose={() => setDeleteTeacherId(null)}
        onConfirm={handleDelete}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${deleteTeacherName}?`}
      />
    </div>
  );
}
