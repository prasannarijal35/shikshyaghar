"use client";

import React from "react";
import { GradeSubject } from "@/types/gradeSubject";

interface SingleGradeSubjectItemProps {
  gradeSubject: GradeSubject;
}

export default function SingleGradeSubjectItem({ gradeSubject }: SingleGradeSubjectItemProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col items-center text-center">
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-400 rounded-t-2xl"></div>

      {/* Subject Name */}
      <h2 className="mt-4 text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors">
        {gradeSubject.subject.name}
      </h2>

      {/* Grade Info */}
      <p className="text-sm text-gray-500 mt-1">Grade {gradeSubject.grade.name}</p>

      {/* Price */}
      <p className="text-sm font-medium text-primary mt-2">
        Price: Rs. {gradeSubject.price}
      </p>
    </div>
  );
}
