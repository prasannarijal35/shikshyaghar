"use client";

import { useEffect, useState } from "react";
import SingleTeacherCard from "@/components/teacher/SingleTeacherCard";
import teacherService, { Teacher } from "@/services/teacherServices";
import { FiRefreshCw } from "react-icons/fi";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    setLoading(true);
    const data = await teacherService.getAllTeachers();
    setTeachers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <section className="min-h-screen bg-white py-20 pb-36 w-full">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-start text-primary">Teachers</h1>
          <button
            onClick={fetchTeachers}
            className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            aria-label="Refresh teachers"
            title="Refresh teachers"
          >
            <span>Refresh</span>
            <FiRefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Teacher Cards */}
        <div className="flex flex-col gap-8 items-center w-full rounded-lg">
          {loading ? (
            <p className="text-gray-600 text-center font-semibold text-lg">
              Loading teachers...
            </p>
          ) : teachers.length ? (
            teachers.map((teacher) => (
              <SingleTeacherCard key={teacher.id} teacher={teacher} />
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
