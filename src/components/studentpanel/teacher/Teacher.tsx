"use client";
import { useEffect, useState, useCallback } from "react";
import SingleTeacherCard from "@/components/studentpanel/teacher/SingleTeacherCard";
import teacherService from "@/services/teacherServices";
import gradeSubjectService, {
  GradeSubject,
} from "@/services/gradeSubjectServices";
import { FiRefreshCw } from "react-icons/fi";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState<string>("");
  const [experience, setExperience] = useState<number | undefined>(undefined);
  const [selectedGradeSubject, setSelectedGradeSubject] =
    useState<GradeSubject | null>(null);
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);

  const fetchData = useCallback(async () => {
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
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  }, [gender, experience, selectedGradeSubject]);

  const fetchDropdownData = useCallback(async () => {
    try {
      const gradeSubjectsData = await gradeSubjectService.getAllGradeSubjects();
      setGradeSubjects(gradeSubjectsData);
    } catch (error) {
      console.error("Error fetching gradeSubjects:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  const handleRefresh = () => {
    setGender("");
    setExperience(undefined);
    setSelectedGradeSubject(null);
  };

  // Make experience behave like TeacherProfile: only non-negative numbers
  const handleExperienceChange = (value: string) => {
    if (!value) {
      setExperience(undefined);
      return;
    }
    const num = Number(value);
    if (isNaN(num) || num < 0) return;
    setExperience(num);
  };

  useEffect(() => {
    fetchData();
  }, [gender, experience, selectedGradeSubject, fetchData]);

  return (
    <section className="min-h-screen bg-white py-20 pb-36 w-full">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-start text-primary">
            Teachers
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border px-3 py-2 rounded-lg"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="number"
              placeholder="Min Experience"
              value={experience ?? ""}
              onChange={(e) => handleExperienceChange(e.target.value)}
              className="border px-3 py-2 rounded-lg w-40"
              min={0}
            />

            <select
              value={selectedGradeSubject?.id ?? ""}
              onChange={(e) => {
                const selected = gradeSubjects.find(
                  (gs) => gs.id === Number(e.target.value)
                );
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

            <button
              onClick={handleRefresh}
              className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            >
              <span>Refresh</span>
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

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