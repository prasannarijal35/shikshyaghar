"use client";

import { useState } from "react";
import RejectModal from "@/components/adminPanel/teacherverification/RejectModal"; // Your RejectModal
import ApproveModal from "@/components/adminPanel/teacherverification/ApproveModal"; // Your ApproveModal
import { toast } from "react-hot-toast";
import Image, { StaticImageData } from "next/image";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import teacher from "@/assets/teachers/teacher1.png";

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  image?: string | StaticImageData;
};

const mockTeachers: Teacher[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    subject: "Mathematics",
    image: teacher,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    subject: "Physics",
    image: teacher,
  },
  {
    id: 3,
    name: "Abhinav Gurung",
    email: "abhinav@example.com",
    subject: "Computer Science",
    image: teacher,
  },
];

export default function TeacherVerificationTable() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleReject = () => {
    if (!selectedTeacher) return;
    setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
    toast.success(`Rejected ${selectedTeacher.name}`);
    setShowRejectModal(false);
  };

  const handleApprove = () => {
    if (!selectedTeacher) return;
    toast.success(`Approved ${selectedTeacher.name}`);
    // Add approve logic here if needed
    setShowApproveModal(false);
  };

  const handleView = (teacher: Teacher) => {
    toast(`Viewing ${teacher.name}`);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">ID</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Photo</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Name</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Email</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Subject</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{teacher.id}</td>
                <td className="py-5 px-4">
                  <Image
                    src={teacher.image || "/default-avatar.png"}
                    alt={teacher.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-5 px-4">{teacher.name}</td>
                <td className="py-5 px-4">{teacher.email}</td>
                <td className="py-5 px-4">{teacher.subject}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(teacher)}
                      className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowApproveModal(true);
                      }}
                      className="p-2 rounded-md text-green-600 hover:bg-gray-100 transition"
                      title="Approve"
                    >
                      <FaCheck size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowRejectModal(true);
                      }}
                      className="p-2 rounded-md text-red-600 hover:bg-gray-100 transition"
                      title="Reject"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RejectModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        description={`Are you sure you want to reject ${selectedTeacher?.name}? This action cannot be undone.`}
        onConfirm={handleReject}
      />

      <ApproveModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        description={`Are you sure you want to approve ${selectedTeacher?.name}?`}
        onConfirm={handleApprove}
      />
    </div>
  );
}
