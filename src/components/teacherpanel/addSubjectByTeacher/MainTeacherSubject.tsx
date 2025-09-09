"use client";
import React, { useState, useEffect } from "react";
import { getUser } from "@/utils/localStorage";
import toast from "react-hot-toast";
import teacherSubjectService from "@/services/teacherSubjectServices";
import TeacherSubjectCard from "./TeacherSubjectCard";
import CreateClassModal from "./TeacherRegistrationPage";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";

const TeacherDashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<TeacherSubjectAssignment[]>([]);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);

  // Fetch teacher subjects
  const fetchClasses = async () => {
    try {
      const user = getUser();
      if (!user || user.role !== "teacher") {
        toast.error("You must be logged in as a teacher.");
        return;
      }

      // Use the teacher ID from the nested teacher object
      const teacherId = user.teacher?.id;
      if (!teacherId) {
        toast.error("Teacher profile not found.");
        return;
      }

      console.log("Teacher ID:", teacherId);

      const res = await teacherSubjectService.getAssignmentsByTeacher(
        teacherId
      );
      console.log("Response from backend:", res);

      setClasses(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch classes");
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    fetchClasses();
  }, []);

  // Edit class
  const handleEdit = (cls: TeacherSubjectAssignment) => {
    setSelectedClass({
      id: cls.id,
      gradeSubjectId: cls.gradeSubjectId,
      startTime: cls.startTime,
      price: cls.price,
      duration: cls.duration,
      meetinglink: cls.meetinglink,
      description: cls.description || "",
    });
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setSelectedClass(null);
    setIsModalOpen(false);
    fetchClasses();
  };

  return (
    <div className="p-6">
      {/* Add Class Button */}
      <div className="flex justify-end mb-6">
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-white hover:text-primary hover:border-primary border border-transparent"
          onClick={() => {
            setSelectedClass(null);
            setIsModalOpen(true);
          }}
        >
          Add a Class
        </button>
      </div>

      {/* Classes Grid */}
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

      {/* Conditionally Render Modal */}
      {isModalOpen && (
        <CreateClassModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialData={selectedClass}
        />
      )}
    </div>
  );
};

export default TeacherDashboardPage;
