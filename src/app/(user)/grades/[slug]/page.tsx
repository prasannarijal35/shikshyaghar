"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import gradeSubjectService from "@/services/gradeSubjectServices";
import { GradeSubject } from "@/types/gradeSubject";

import Breadcrumb from "@/components/common/BreadCrumb";
import SingleGradeSubjectItem from "@/components/gradeSubject/SingleGradeSubjectItem";

export default function GradeSubjectPage() {
  const { slug } = useParams();
  const [gradeSubjects, setGradeSubjects] = useState<GradeSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchSubjects = async () => {
      try {
        const data = await gradeSubjectService.getSubjectsByGradeSlug(slug as string);
        setGradeSubjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch subjects for this grade");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [slug]);

  return (
    <div className="p-6">
      <Breadcrumb title={`Grade ${slug} Subjects`} />

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
      ) : gradeSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          {/* Icon */}
          <svg
            className="w-20 h-20 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6h6v6M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No subjects found
          </h2>
          <p className="text-gray-500">
            Sorry, there are no subjects available for Grade {slug} at the moment.
          </p>
        </div>
      ) : (
        <div className="container py-20">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {gradeSubjects.map((gs) => (
              <SingleGradeSubjectItem key={gs.id} gradeSubject={gs} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
