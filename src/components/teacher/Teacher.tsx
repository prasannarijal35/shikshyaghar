"use client";

import { useEffect, useState } from "react";
import SingleTeacherCard from "@/components/teacher/SingleTeacherCard";
import teacherService from "@/services/teacherServices";
import gradeSubjectService, { GradeSubject } from "@/services/gradeSubjectServices";
import { FiRefreshCw } from "react-icons/fi";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [gender, setGender] = useState<string>("");
  const [experience, setExperience] = useState<number | undefined>(undefined);
  const [selectedGradeSubject, setSelectedGradeSubject] = useState<GradeSubject | null>(null);

  // Dropdown data
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);

  // Fetch teachers
  const fetchData = async () => {
    setLoading(true);
    try {
      const teachersData = await teacherService.getAllTeachers({
        gender,
        experience,
        gradeId: selectedGradeSubject?.grade.id,
        subjectId: selectedGradeSubject?.subject.id,
      });
      setTeachers(teachersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    try {
      const gradeSubjectsData = await gradeSubjectService.getAllGradeSubjects();
      setGradeSubjects(gradeSubjectsData);
    } catch (error) {
      console.error("Error fetching gradeSubjects:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gender, experience, selectedGradeSubject]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  return (
    <section className="min-h-screen bg-white py-20 pb-36 w-full">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-start text-primary">
            Teachers
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            {/* Gender Filter */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Experience Filter */}
            <input
              type="number"
              placeholder="Min Experience"
              value={experience ?? ""}
              onChange={(e) =>
                setExperience(e.target.value ? Number(e.target.value) : undefined)
              }
              className="border px-3 py-2 rounded-lg w-40"
            />

            {/* Grade-Subject Combined Filter */}
            <select
              value={selectedGradeSubject?.id ?? ""}
              onChange={(e) => {
                const selected = gradeSubjects.find((gs) => gs.id === Number(e.target.value));
                setSelectedGradeSubject(selected || null);
              }}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">All Subjects & Grades</option>
              {gradeSubjects.map((gs) => (
                <option key={gs.id} value={gs.id}>
                  {gs.subject.name} - {gs.grade.name}
                </option>
              ))}
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchData}
              className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            >
              <span>Refresh</span>
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Teachers list */}
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
