// pages/trainings.tsx or trainings.jsx
import React from "react";

const trainings = [
  {
    title: "Medical Entrance Preparation",
    description:
      "Comprehensive coaching for medical entrance exams including Biology, Chemistry, and Physics with mock tests and interview practice.",
    link: "/trainings/medical-entrance",
  },
  {
    title: "Engineering Entrance Preparation",
    description:
      "Targeted training for engineering aspirants with a focus on Math, Physics, and Chemistry. Includes past paper practice and test series.",
    link: "/trainings/engineering-entrance",
  },
  {
    title: "SEE Preparation",
    description:
      "Focused revision and mock exam sessions to help students excel in the Secondary Education Examination (SEE).",
    link: "/trainings/see-preparation",
  },
];

export default function Trainings() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Training Programs
      </h1>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Get expert coaching and preparation for competitive exams and academic success. All programs are led by experienced instructors and include live sessions, practice materials, and personalized guidance.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((training, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">
              {training.title}
            </h2>
            <p className="text-gray-600 mb-4">{training.description}</p>
            <a
              href={training.link}
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
