"use client";

import { useState } from "react";
import { DeleteModal } from "@/components/adminPanel/teachers";
import { teachers as Teachers } from "@/data/teacher";
import { Teacher } from "@/types/teacher";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FaBan, FaTrashAlt, FaEye } from "react-icons/fa";

export default function TeacherTable() {
  const [teachers, setTeachers] = useState<Teacher[]>(Teachers);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleDelete = () => {
    if (!selectedTeacher) return;
    setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
    toast.success(`Deleted ${selectedTeacher.name}`);
    setShowDeleteModal(false);
  };

  const handleBlock = (teacher: Teacher) => {
    toast(`Blocked ${teacher.name}`);
  };

  const handleView = (teacher: Teacher) => {
    toast(`Viewing ${teacher.name}`);
    // You can navigate to a detailed page or open a modal here.
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Teacher Management
      </h1>
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
                <td className="py-5 px-4">{teacher.subjects}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(teacher)}
                      className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 transition-colors duration-200"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      onClick={() => handleBlock(teacher)}
                      className="p-2 rounded-md text-primary hover:text-white hover:bg-primary transition-colors duration-200"
                      title="Block"
                    >
                      <FaBan size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 rounded-md text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description={`Are you sure you want to delete ${selectedTeacher?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </main>
  );
}
