"use client";

import { FaChalkboardTeacher } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";

export default function MyCourses() {
  // Dummy courses (replace with real API data)
  const courses = [
    {
      id: 1,
      title: "Mathematics",
      level: "Grade 10",
      students: 28,
      image: logo,
    },
    {
      id: 2,
      title: "Physics",
      level: "Grade 11",
      students: 22,
      image: logo,
    },
    {
      id: 3,
      title: "Geometry",
      level: "Grade 9",
      students: 18,
      image: logo,
    },
    {
      id: 4,
      title: "Geometry",
      level: "Grade 9",
      students: 18,
      image: logo,
    },
    {
      id: 5,
      title: "Geometry",
      level: "Grade 9",
      students: 18,
      image: logo,
    },
  ];

  return (
    <main className="p-6 sm:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <FaChalkboardTeacher className="text-blue-600" /> My Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-gray-500">You haven’t added any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                <div className="relative w-full h-36 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  Level: {course.level}
                </p>
                <p className="text-sm text-gray-600">
                  Students: {course.students}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
