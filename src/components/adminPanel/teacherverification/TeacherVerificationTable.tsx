"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import myAxios from "@/services/apiServices";
import { toast } from "react-hot-toast";
import ViewTeacherModal from "@/components/adminPanel/teacherverification/ViewTeacherModel";

type Teacher = {
  id: number; // User ID
  fullName: string;
  email: string;
  profilePicture?: string;
  qualification?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  teacherId?: number; // Teacher table ID
};

export default function TeacherVerificationTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Fetch pending teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data } = await myAxios.get("/admin/teachers/pending");

      const flattened: Teacher[] = data.data.map((t: any) => ({
        id: t.id,
        fullName: t.fullName,
        email: t.email,
        profilePicture: t.teacher?.profilePicture,
        qualification: t.teacher?.qualification,
        status: t.teacher?.status || "PENDING",
        teacherId: t.teacher?.id,
        bio: t.teacher?.bio,
        documentUrl: t.teacher?.documentUrl,
      }));

      setTeachers(flattened);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Approve teacher
  const handleApprove = async (teacher: Teacher) => {
    if (!teacher.teacherId) return;
    try {
      await myAxios.put(`/admin/teachers/${teacher.teacherId}/approve`);
      toast.success(`Approved ${teacher.fullName}`);
      setTeachers((prev) =>
        prev.map((t) =>
          t.teacherId === teacher.teacherId ? { ...t, status: "APPROVED" } : t
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to approve teacher");
    }
  };

  // Reject teacher
  const handleReject = async (teacher: Teacher) => {
    if (!teacher.teacherId) return;
    try {
      await myAxios.put(`/admin/teachers/${teacher.teacherId}/reject`);
      toast.success(`Rejected ${teacher.fullName}`);
      setTeachers((prev) =>
        prev.map((t) =>
          t.teacherId === teacher.teacherId ? { ...t, status: "REJECTED" } : t
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reject teacher");
    }
  };

  // View teacher
  const handleView = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-4 px-4 text-left font-medium">ID</th>
            <th className="py-4 px-4 text-left font-medium">Photo</th>
            <th className="py-4 px-4 text-left font-medium">Name</th>
            <th className="py-4 px-4 text-left font-medium">Email</th>
            <th className="py-4 px-4 text-left font-medium">Qualification</th>
            <th className="py-4 px-4 text-left font-medium">Status</th>
            <th className="py-4 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-base">
          {teachers.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-t hover:bg-primary/10 transition-colors"
            >
              <td className="py-5 px-4">{teacher.id}</td>
              <td className="py-5 px-4">
                <Image
                  src={teacher.profilePicture || "/default-avatar.png"}
                  alt={teacher.fullName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="py-5 px-4">{teacher.fullName}</td>
              <td className="py-5 px-4">{teacher.email}</td>
              <td className="py-5 px-4">{teacher.qualification || "-"}</td>
              <td className="py-5 px-4">{teacher.status}</td>
              <td className="py-5 px-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(teacher)}
                    className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                  >
                    <FaEye size={16} />
                  </button>

                  {teacher.status?.toUpperCase() === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(teacher)}
                        className="p-2 rounded-md text-green-600 hover:bg-gray-100 transition"
                      >
                        <FaCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(teacher)}
                        className="p-2 rounded-md text-red-600 hover:bg-gray-100 transition"
                      >
                        <FaTimes size={16} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTeacher && (
        <ViewTeacherModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          teacher={selectedTeacher}
        />
      )}
    </div>
  );
}
