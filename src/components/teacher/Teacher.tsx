"use client";

import { useEffect, useState } from "react";
import SingleTeacherCard from "@/components/teacher/SingleTeacherCard";
import teacherService from "@/services/teacherServices";
import teacherSubjectService, { TeacherSubjectWithDetails } from "@/services/teacherSubjectService";
import { FiRefreshCw } from "react-icons/fi";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers and their subject assignments
  const fetchData = async () => {
    setLoading(true);

    try {
      const [teachersData] = await Promise.all([
        teacherService.getAllTeachers(),
      ]);
      setTeachers(teachersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Group subjects by teacherId
  const subjectsByTeacher: Record<number, TeacherSubjectWithDetails[]> = {};
  teacherSubjects.forEach((s) => {
    if (!subjectsByTeacher[s.teacherId]) subjectsByTeacher[s.teacherId] = [];
    subjectsByTeacher[s.teacherId].push(s);
  });

  return (
    <section className="min-h-screen bg-white py-20 pb-36 w-full">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-start text-primary">Teachers</h1>
          <button
            onClick={fetchData}
            className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
          >
            <span>Refresh</span>
            <FiRefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Teachers list */}
        <div className="flex flex-col gap-8 items-center w-full rounded-lg">
          {loading ? (
            <p className="text-gray-600 text-center font-semibold text-lg">
              Loading teachers...
            </p>
          ) : teachers.length ? (
            teachers.map((teacher) => (
              <SingleTeacherCard
                key={teacher.id}
                teacher={teacher}
              />
            ))
          ) : (
            <p className="text-red-500 text-center font-semibold text-lg">
              No teachers found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
