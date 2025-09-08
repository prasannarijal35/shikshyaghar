/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import myAxios from "@/services/apiServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ViewStudentModal from "./ViewStudentModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function StudentManagementTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewStudent, setViewStudent] = useState<any | null>(null);
  const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);
  const [deleteStudentName, setDeleteStudentName] = useState<string>("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await myAxios.get("/admin/students");
      setStudents(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async () => {
    if (!deleteStudentId) return;
    try {
      await myAxios.delete(`/admin/students/${deleteStudentId}`);
      toast.success("Student deleted successfully");
      setDeleteStudentId(null);
      fetchStudents();
    } catch (error) {
      toast.error("Failed to delete student");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Gender</th>
            <th className="px-6 py-3 text-left">Birth Year</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Updated At</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student: any) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{student.fullName}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.phone || "-"}</td>
                <td className="px-6 py-4">{student.gender || "-"}</td>
                <td className="px-6 py-4">{student.birthYear || "-"}</td>
                <td className="px-6 py-4">{student.createdAt}</td>
                <td className="px-6 py-4">{student.updatedAt}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  {/* View */}
                  <button
                    onClick={() => setViewStudent(student)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEye size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setDeleteStudentId(student.id);
                      setDeleteStudentName(student.fullName);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* View Modal */}
      <ViewStudentModal
        isOpen={!!viewStudent}
        onClose={() => setViewStudent(null)}
        student={viewStudent}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteStudentId}
        onClose={() => setDeleteStudentId(null)}
        onConfirm={handleDelete}
        studentName={deleteStudentName}
      />
    </div>
  );
}
