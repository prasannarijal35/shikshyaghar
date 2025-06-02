"use client";
import { useState } from "react";
import TeacherCard from "@/components/teacher/SingleTeacherCard";
import { teachers } from "@/data/teacher";
import { FiRefreshCw } from "react-icons/fi";

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

  const clearFilters = () => {
    setSelectedGrade(grades[0]);
    setSelectedSubject(subjects[0]);
    setSelectedQualification(qualifications[0]);
    setSelectedExperience(null);
    setSelectedGender(null);
  };

  return (
    <section className="min-h-screen bg-white py-20 pb-36 w-full">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-start text-primary">
            Teachers
          </h1>
          <button
            onClick={clearFilters}
            className="flex justify-between items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
            aria-label="Clear filters"
            title="Clear filters"
          >
            <span className="">Refresh</span>
            <FiRefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4 justify-start">
          {[
            {
              value: selectedGrade,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedGrade(e.target.value),
              options: grades,
            },
            {
              value: selectedSubject,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedSubject(e.target.value),
              options: subjects,
            },
            {
              value: selectedQualification,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedQualification(e.target.value),
              options: qualifications,
            },
            {
              value: selectedExperience ?? "",
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedExperience(e.target.value || null),
              options: ["", "0", "2", "5", "8", "10"],
              labels: [
                "All Experience",
                "0+ Years",
                "2+ Years",
                "5+ Years",
                "8+ Years",
                "10+ Years",
              ],
            },
            {
              value: selectedGender ?? "",
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedGender(e.target.value || null),
              options: ["", "Male", "Female"],
              labels: ["All Genders", "Male", "Female"],
            },
          ].map(({ value, onChange, options, labels }, idx) => (
            <select
              key={idx}
              className="border border-primary rounded-lg px-4 py-2 text-primary font-medium hover:bg-primary/5 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50 transition"
              value={value}
              onChange={onChange}
            >
              {(labels ?? options).map((opt, i) => (
                <option key={opt} value={options ? options[i] : opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>
        {/* Teacher Cards */}
        <div className="flex flex-col gap-8 items-center w-full">
          {filteredTeachers.length ? (
            filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <p className="text-red-500 text-center font-semibold text-lg">
              No teachers match your filter criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
