"use client";

import React, { useEffect, useState } from "react";
import SingleGradeItem from "@/components/grades/SingleGradeItem";
import Breadcrumb from "@/components/common/BreadCrumb";
import { Grade } from "@/types/grade";
import gradeService from "@/services/gradeServices";

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

  if (loading) return <p>Loading grades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <Breadcrumb title="All Grades" />
      <div className="container py-28">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-20">
        {grades.map((grade) => (
          <SingleGradeItem key={grade.id} grade={grade} />
        ))}
      </div>
      </div>
    </div>
  );
}
