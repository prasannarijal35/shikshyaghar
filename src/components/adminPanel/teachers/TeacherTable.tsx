/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import myAxios from "@/services/apiServices";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiTrash2 } from "react-icons/fi";
import ViewTeacherModal from "../teacherverification/ViewTeacherModel";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function TeacherManagementTable() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // For modals
  const [viewTeacher, setViewTeacher] = useState<any | null>(null);
  const [deleteTeacherId, setDeleteTeacherId] = useState<number | null>(null);
  const [deleteTeacherName, setDeleteTeacherName] = useState<string>("");

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await myAxios.get("/admin/teachers");
      setTeachers(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async () => {
    if (!deleteTeacherId) return;
    try {
      await myAxios.delete(`/admin/teachers/${deleteTeacherId}`);
      toast.success("Teacher deleted successfully");
      setDeleteTeacherId(null);
      fetchTeachers();
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Qualification</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : teachers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No teachers found
              </td>
            </tr>
          ) : (
            teachers.map((teacher: any) => (
              <tr
                key={teacher.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{teacher.fullName}</td>
                <td className="px-6 py-4">{teacher.email}</td>
                <td className="px-6 py-4">{teacher.qualification || "-"}</td>
                <td className="px-6 py-4">{teacher.status}</td>
                <td className="px-6 py-4 flex justify-center gap-3">
                  {/* View */}
                  <button
                    onClick={() => setViewTeacher(teacher)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEye size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setDeleteTeacherId(teacher.id);
                      setDeleteTeacherName(teacher.fullName);
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
      <ViewTeacherModal
        isOpen={!!viewTeacher}
        onClose={() => setViewTeacher(null)}
        teacher={viewTeacher}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTeacherId}
        onClose={() => setDeleteTeacherId(null)}
        onConfirm={handleDelete}
        teacherName={deleteTeacherName}
      />
    </div>
  );
}
