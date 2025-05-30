"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/logo/Sg_logo.png";

const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@studentmail.com",
    course: "Mathematics",
    status: "Active",
    image: logo,
  },
  {
    id: 2,
    name: "Priya Karki",
    email: "priya@studentmail.com",
    course: "Physics",
    status: "Active",
    image: logo,
  },
  {
    id: 3,
    name: "Ankit Thapa",
    email: "ankit@studentmail.com",
    course: "Chemistry",
    status: "Inactive",
    image: logo,
  },
  {
    id: 4,
    name: "Ankit Thapa",
    email: "ankit@studentmail.com",
    course: "Chemistry",
    status: "Inactive",
    image: logo,
  },
  {
    id: 5,
    name: "Ankit Thapa",
    email: "ankit@studentmail.com",
    course: "Chemistry",
    status: "Inactive",
    image: logo,
  },
];

export default function MyStudentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Students</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <Image
              src={student.image}
              alt={student.name}
              width={80}
              height={80}
              className="rounded-full object-cover h-20 w-20 border-2 border-primary mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {student.name}
            </h2>
            <p className="text-sm text-gray-500">{student.email}</p>
            <p className="text-sm text-gray-600 mt-2">
              Course: <span className="font-medium">{student.course}</span>
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                student.status === "Active" ? "text-green-600" : "text-red-500"
              }`}
            >
              {student.status}
            </p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
