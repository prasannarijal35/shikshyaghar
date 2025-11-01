"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen } from "lucide-react";
import TeacherAttendance from "@/components/teacherpanel/attendance/TeacherAttendance";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import { getUser } from "@/utils/localStorage";

export default function TeacherAttendancePage() {
  const [teacherSubjects, setTeacherSubjects] = useState<
    TeacherSubjectAssignment[]
  >([]);
  const [selectedSubject, setSelectedSubject] =
    useState<TeacherSubjectAssignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherSubjects();
  }, []);

  const fetchTeacherSubjects = async () => {
    try {
      setLoading(true);
      const user = getUser();
      if (!user?.teacher?.id) {
        toast.error("Teacher profile not found");
        return;
      }
      const response = await TeacherSubjectService.getAssignmentsByTeacher(
        user.teacher.id
      );
      setTeacherSubjects(response.data.items);
      if (response.data.items.length > 0) {
        setSelectedSubject(response.data.items[0]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load your subjects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
    );
  }

  if (teacherSubjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Subjects Assigned
        </h2>
        <p className="text-gray-600">
          You haven&apos;t been assigned any subjects yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Subject Selector */}
      {teacherSubjects.length > 1 && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject?.id || ""}
              onChange={(e) => {
                const subject = teacherSubjects.find(
                  (s) => s.id === Number(e.target.value)
                );
                setSelectedSubject(subject || null);
              }}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {teacherSubjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.gradeSubject.subject.name} -{" "}
                  {subject.gradeSubject.grade.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Attendance Component */}
      {selectedSubject && (
        <TeacherAttendance
          teacherSubjectId={selectedSubject.id}
          subjectName={`${selectedSubject.gradeSubject.subject.name} - ${selectedSubject.gradeSubject.grade.name}`}
        />
      )}
    </div>
  );
}
