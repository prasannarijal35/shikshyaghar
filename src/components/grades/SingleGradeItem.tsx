"use client";

import React from "react";
import Link from "next/link";
import { Grade } from "@/types/grade";

interface SingleGradeItemProps {
  grade: Grade;
}

export default function SingleGradeItem({ grade }: SingleGradeItemProps) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-200 text-center">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Grade {grade.name}
      </h2>

      <Link
        href={`/grades/${grade.slug}`}
        className="inline-block text-sm text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 transition"
      >
        View Subjects
      </Link>
    </div>
  );
}
