"use client";
import { useState } from "react";
import TeacherCard from "@/components/teacher/SingleTeacherCard";
import { teachers } from "@/data/teacher";

const grades = [
  "All Grades",
  "Grade 1 to 5",
  "Grade 6 to 8",
  "Grade 9 to 10",
  "Grade 11 to 12",
];
const subjects = [
  "All Subjects",
  "Mathematics",
  "English",
  "Physics",
  "Communication Skills",
];
const qualifications = [
  "All Qualifications",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
];

export default function TeacherFilterPage() {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedQualification, setSelectedQualification] = useState(
    qualifications[0]
  );
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchGrade =
      selectedGrade === "All Grades" || teacher.gradeRange === selectedGrade;
    const matchSubject =
      selectedSubject === "All Subjects" ||
      teacher.subjects.includes(selectedSubject);
    const matchQualification =
      selectedQualification === "All Qualifications" ||
      teacher.education.includes(selectedQualification);
    const matchGender = selectedGender
      ? teacher.gender === selectedGender
      : true;
    const matchExperience = selectedExperience
      ? parseInt(teacher.teachingExperience) >= parseInt(selectedExperience)
      : true;
    return (
      matchGrade &&
      matchSubject &&
      matchQualification &&
      matchGender &&
      matchExperience
    );
  });

  return (
    <section className="min-h-screen bg-gray-200 py-20 pb-36 container ">
      <div className="w-full ">
        <h1 className="text-3xl font-bold mb-6  text-start text-primary">
          Teachers
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 justify-start">
          <select
            className="border border-gray-700 rounded px-4 py-2"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-700 rounded px-4 py-2"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-700 rounded px-4 py-2"
            value={selectedQualification}
            onChange={(e) => setSelectedQualification(e.target.value)}
          >
            {qualifications.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-700 rounded px-4 py-2"
            value={selectedExperience ?? ""}
            onChange={(e) => setSelectedExperience(e.target.value || null)}
          >
            <option value="">All Experience</option>
            {["0", "2", "5", "8", "10"].map((exp) => (
              <option key={exp} value={exp}>
                {exp}+ Years
              </option>
            ))}
          </select>

          <select
            className="border border-gray-700 rounded px-4 py-2"
            value={selectedGender ?? ""}
            onChange={(e) => setSelectedGender(e.target.value || null)}
          >
            <option value="">All Genders</option>
            {["Male", "Female"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Teacher Cards */}
        <div className="flex flex-col gap-8 items-center w-full">
          {filteredTeachers.length ? (
            filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <p className="text-red-500 text-center">
              No teachers match your filter criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
