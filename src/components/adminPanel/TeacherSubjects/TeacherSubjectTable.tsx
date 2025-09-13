"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import { TeacherSubjectAssignment, TeacherSubjectsResponse } from "@/types/teacherSubject";

export default function TeacherSubjectTable() {
  const [teacherSubjects, setTeacherSubjects] = useState<TeacherSubjectAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all teacher subjects
      const response: TeacherSubjectsResponse = await TeacherSubjectService.getAllAssignments();

      // Set data
      setTeacherSubjects(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch teacher-subject data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading data...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Teacher-Subject Overview
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left font-medium">S.N</th>
              <th className="py-4 px-4 text-left font-medium">Teacher Name</th>
              <th className="py-4 px-4 text-left font-medium">Grade-Subject</th>
              <th className="py-4 px-4 text-left font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {teacherSubjects.map((ts, index) => (
              <tr key={ts.id} className="border-t hover:bg-primary/10">
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">{ts.teacher?.user?.fullName || "N/A"}</td>
                <td className="py-4 px-4">
                  Grade {ts.gradeSubject?.grade?.name} - {ts.gradeSubject?.subject?.name}
                </td>
                <td className="py-4 px-4">{ts.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
