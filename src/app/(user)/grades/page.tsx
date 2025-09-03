"use client";

import React, { useEffect, useState } from "react";
import gradeService, { Grade } from "@/services/gradeServices";
import SingleGradeItem from "@/components/grades/SingleGradeItem";
import Breadcrumb from "@/components/common/BreadCrumb";

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await gradeService.getAllGrades();
        setGrades(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch grades");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <>
      <Breadcrumb title="Grades" />

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-32 rounded-xl shadow"
            ></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : (
        <div className="container py-20">
          <div className=" grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {grades.map((grade) => (
            <SingleGradeItem key={grade.id} grade={grade} />
          ))}
        </div>
        </div>
      )}
    </>
  );
}
