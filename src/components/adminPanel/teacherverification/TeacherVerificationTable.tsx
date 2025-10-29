"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { BookOpen } from "lucide-react";
import myAxios from "@/services/apiServices";
import { toast } from "react-hot-toast";
import ViewTeacherModal from "@/components/adminPanel/teacherverification/ViewTeacherModel";

type Teacher = {
  id: number;
  fullName: string;
  email: string;
  profilePicture?: string;
  qualification?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  teacherId?: number;
};

export default function TeacherVerificationTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data } = await myAxios.get("/admin/teachers/pending");

      const flattened: Teacher[] = data.data.map((t: any) => ({
        id: t.id,
        fullName: t.fullName,
        email: t.email,
        phone: t.phone || "-",
        gender: t.gender || "-",
        birthYear: t.birthYear || "-",
        profilePicture: t.teacher?.profilePicture || "/default-avatar.png",
        qualification: t.teacher?.qualification || "-",
        status: t.teacher?.status || "PENDING",
        teacherId: t.teacher?.id,
        bio: t.teacher?.bio || "-",
        experience: t.teacher?.experience != null ? t.teacher.experience : "-",
        availability: t.teacher?.availability || "-",
        documentUrl: t.teacher?.documentUrl || null,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
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

  const handleView = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading teachers...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Teacher Verification
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Approve or reject pending teacher accounts
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      {teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] relative">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center animate-pulse shadow-lg mb-8">
            <BookOpen className="w-16 h-16 text-purple-500" />
          </div>
          <div className="text-center space-y-6 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No Pending Teachers
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              All teacher accounts have been reviewed. Pending accounts will
              appear here for verification.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-purple-50/50 transition-all duration-200 group"
                  >
                    <td className="py-6 px-6 text-gray-900 font-medium">
                      {teacher.id}
                    </td>
                    <td className="py-6 px-6">
                      <Image
                        src={teacher.profilePicture || "/default-avatar.png"}
                        alt={teacher.fullName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-6 px-6">{teacher.fullName}</td>
                    <td className="py-6 px-6">{teacher.email}</td>
                    <td className="py-6 px-6">
                      {teacher.qualification || "-"}
                    </td>
                    <td className="py-6 px-6">{teacher.status}</td>
                    <td className="py-6 px-6">
                      <div className="flex justify-end items-center gap-2">
                        {/* View Button */}
                        <button
                          onClick={() => handleView(teacher)}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                          <FaEye className="w-4 h-4 mr-1" /> View
                        </button>

                        {/* Only show Approve/Reject if pending */}
                        {teacher.status?.toUpperCase() === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleApprove(teacher)}
                              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                            >
                              <FaCheck className="w-4 h-4 mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(teacher)}
                              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                            >
                              <FaTimes className="w-4 h-4 mr-1" /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedTeacher && (
        <ViewTeacherModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          teacher={selectedTeacher}
        />
      )}
    </main>
  );
}