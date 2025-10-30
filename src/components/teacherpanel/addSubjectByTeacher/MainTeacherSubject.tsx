"use client";
import React, { useState, useEffect } from "react";
import TeacherSubjectCard from "./TeacherSubjectCard";
import CreateClassModal from "./TeacherRegistrationPage";
import {
  TeacherSubjectAssignment,
  CreateClassForm,
} from "@/types/teacherSubject";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import { getUser } from "@/utils/localStorage";
import toast from "react-hot-toast";
const TeacherDashboardPage: React.FC = () => {
  const [classes, setClasses] = useState<TeacherSubjectAssignment[]>([]);
  const [selectedClass, setSelectedClass] = useState<CreateClassForm | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const user = getUser();
      console.log("Logged in user:", user);

      if (!user) {
        toast.error("User not logged in");
        setLoading(false);
        return;
      }
      if (user.role !== "teacher") {
        toast.error(`Logged in user is not a teacher (role: ${user.role})`);
        setLoading(false);
        return;
      }
      const teacherId = user.teacher?.id;
      console.log("Teacher ID:", teacherId);
      if (!teacherId) {
        toast.error("Teacher profile not found.");
        setLoading(false);
        return;
      }
      const res = await TeacherSubjectService.getAssignmentsByTeacher(
        teacherId
      );
      console.log("API Response:", res);

      setClasses(res.data?.items || []);
    } catch (err: any) {
      console.error("Fetch classes error:", err);
      toast.error(err?.message || "Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  const handleEdit = (cls: TeacherSubjectAssignment) => {
    console.log("Editing class:", cls);
    setSelectedClass({
      id: cls.id,
      gradeSubjectId: cls.gradeSubjectId,
      startTime:
        cls.startTime.length === 5 ? cls.startTime + ":00" : cls.startTime,
      price: cls.price || 0,
      duration: cls.duration,
      meetingLink: cls.meetingLink,
      description: cls.description || "",
      teacherId: cls.teacherId,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedClass(null);
    setIsModalOpen(false);
    fetchClasses();
  };

  const handleAddNew = () => {
    console.log("Adding new class");
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Class Manager</h1>
        <button
          className="bg-primary text-white py-2 px-5 rounded-lg shadow-md hover:bg-white hover:text-primary hover:border-primary border border-transparent transition-all duration-300"
          onClick={handleAddNew}
        >
          + Add Class
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-lg mt-10">Loading classes...</p>
      ) : classes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-500 text-lg mb-4">No classes available.</p>
          <p className="text-gray-400 text-sm">
            Click &quot;Add Class&quot; to create your first class.
          </p>
        </div>
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
