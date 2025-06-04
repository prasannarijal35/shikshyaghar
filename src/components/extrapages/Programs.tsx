// pages/programs.tsx (or programs.jsx)
import React from "react";

const programs = [
  {
    title: "Class 8",
    description: "Covers Math, Science, English, and more. Foundation building for SEE.",
    link: "/programs/class-8",
  },
  {
    title: "Class 9",
    description: "In-depth subject-wise preparation aligned with school curriculum.",
    link: "/programs/class-9",
  },
  {
    title: "Class 10 (SEE)",
    description: "Special focus on SEE preparation with weekly tests and mock exams.",
    link: "/programs/class-10",
  },
  {
    title: "Grade 11 (Science)",
    description: "Advanced coaching for Physics, Chemistry, Biology, and Mathematics.",
    link: "/programs/grade-11-science",
  },
  {
    title: "Grade 11 (Management)",
    description: "Focused curriculum for Business Studies, Accounting, and Economics.",
    link: "/programs/grade-11-management",
  },
  {
    title: "Grade 12 (Science)",
    description: "Comprehensive prep for board and entrance exams with expert tutors.",
    link: "/programs/grade-12-science",
  },
  {
    title: "Grade 12 (Management)",
    description: "Intensive coaching for final exams with career guidance sessions.",
    link: "/programs/grade-12-management",
  },
];

export default function Programs() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Programs
      </h1>

      {/* Optional filter section */}
      <div className="mb-6 text-center">
        {/* You can add dropdowns for class, stream, etc. */}
        <span className="text-sm text-gray-500">Filter by class, stream, or level (coming soon)</span>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">{program.title}</h2>
            <p className="text-gray-600 mb-4">{program.description}</p>
            <a
              href={program.link}
              className="inline-block text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 transition"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
