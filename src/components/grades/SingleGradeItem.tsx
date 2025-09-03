"use client";

import React from "react";
import Link from "next/link";
import { Grade } from "@/services/gradeServices";

interface SingleGradeItemProps {
  grade: Grade;
}

export default function SingleGradeItem({ grade }: SingleGradeItemProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col items-center text-center">
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-400 rounded-t-2xl"></div>

      {/* Grade Number */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
        Grade {grade.name}
      </h2>

      {/* Subtext (optional, you can remove if not needed) */}
      <p className="text-sm text-gray-500 mt-1">Explore subjects & details</p>

      {/* Button */}
      <Link
        href={`/grades/${grade.slug}`}
        className="mt-6 inline-block text-sm font-medium text-white bg-primary px-5 py-2.5 rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
      >
        View Subjects
      </Link>
    </div>
  );
}
