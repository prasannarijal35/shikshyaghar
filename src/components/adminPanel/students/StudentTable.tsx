"use client";

import { useState } from "react";

import { mockStudents } from "@/data/students";
import { Student } from "@/types/students";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FaBan, FaTrashAlt, FaEye } from "react-icons/fa";
import DeleteModal from "@/components/adminPanel/students/DeleteModal";

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleDelete = () => {
    if (!selectedStudent) return;
    setStudents(students.filter((s) => s.id !== selectedStudent.id));
    toast.success(`Deleted ${selectedStudent.name}`);
    setShowDeleteModal(false);
  };

  const handleBlock = (student: Student) => {
    toast(`Blocked ${student.name}`);
  };

  const handleView = (student: Student) => {
    toast(`Viewing ${student.name}`);
    // You can navigate to a detailed page or open a modal here.
  };

  return (
        <>
        <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Student Management
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">ID</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Photo</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Name</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Email</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Course</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {students.map((student) => (
              <tr key={student.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{student.id}</td>
                <td className="py-5 px-4">
                  <Image
                    src={student.image || "/default-avatar.png"}
                    alt={student.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-5 px-4">{student.name}</td>
                <td className="py-5 px-4">{student.email}</td>
                <td className="py-5 px-4">{student.course}</td>
                <td className="py-5 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(student)}
                      className="p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-600 transition-colors duration-200"
                      title="View"
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      onClick={() => handleBlock(student)}
                      className="p-2 rounded-md text-primary hover:text-white hover:bg-primary transition-colors duration-200"
                      title="Block"
                    >
                      <FaBan size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
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
        description={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
    </main>
    </>
  );
}