"use client";

import React, { useState, useEffect } from "react";
import { CreateClassModal } from "@/components/teacherpanel/addSubjectByTeacher";
import TeacherSubjectCard from "@/components/teacherpanel/addSubjectByTeacher/TeacherSubjectCard";
import teacherSubjectService from "@/services/teacherSubjectServices";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import toast from "react-hot-toast";

const TeacherDashboardPage: React.FC<{ teacherId: number }> = ({
  teacherId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<TeacherSubjectAssignment[]>([]);
  const [selectedClass, setSelectedClass] =
    useState<TeacherSubjectAssignment | null>(null);

  // Fetch teacher subjects for logged-in teacher
  const fetchClasses = async () => {
    try {
      const res = await teacherSubjectService.getByTeacherId(teacherId);
      setClasses(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      toast.error("Failed to fetch classes");
    }
  };

  useEffect(() => {
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open edit modal
  const handleEdit = (cls: TeacherSubjectAssignment) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
  };

  // After modal close, refresh list
  const handleModalClose = () => {
    setSelectedClass(null);
    setIsModalOpen(false);
    fetchClasses();
  };

  return (
    <div className="p-6 ">
      {/* Add class button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-white hover:text-primary hover:border-primary border border-transparent"
          onClick={() => setIsModalOpen(true)}
        >
          Add a Class
        </button>
      </div>

      {/* Teacher Subjects Grid */}
      {classes.length === 0 ? (
        <p className="text-gray-600">
          No classes available. Add a class to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <TeacherSubjectCard
              key={cls.id}
              cls={cls}
              onEdit={handleEdit}
              onDeleted={fetchClasses}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Class Modal */}
      <CreateClassModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedClass}
      />
    </div>
  );
};

export default TeacherDashboardPage;
