"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { TeacherSubscriptionPage } from "@/components/common";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import { Teacher } from "@/types/teacher";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import { getUser } from "@/utils/localStorage";

export default function CreateSubscriptionClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const teacherSubjectIdParam = searchParams.get("teacherSubjectId");

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teacherSubject, setTeacherSubject] =
    useState<TeacherSubjectAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const student = getUser();
      if (!student || student.role !== "student") {
        toast.error("You must be logged in as a student to subscribe");
        router.push("/student/login");
        return;
      }

      if (!teacherSubjectIdParam) {
        setError("Invalid teacher subject ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const id = Number(teacherSubjectIdParam);
        if (isNaN(id)) throw new Error("Invalid teacher subject ID");

        const foundSubject: TeacherSubjectAssignment =
          await TeacherSubjectService.getAssignmentById(id);
        setTeacherSubject(foundSubject);

        const mappedTeacher: Teacher = {
          id: foundSubject.teacher.user.id,
          teacherId: foundSubject.teacher.id,
          slug: foundSubject.teacher.user.slug,
          fullName: foundSubject.teacher.user.fullName,
          email: foundSubject.teacher.user.email,
          phone: foundSubject.teacher.user.phone,
          bio: foundSubject.teacher.bio,
          experience: foundSubject.teacher.experience ?? undefined,
          availability: foundSubject.teacher.availability,
          qualification: foundSubject.teacher.qualification,
          profilePicture: foundSubject.teacher.profilePicture,
          documentUrl: foundSubject.teacher.documentUrl,
          status: foundSubject.teacher.status,
          createdAt: foundSubject.teacher.createdAt,
          updatedAt: foundSubject.teacher.updatedAt,
        };

        setTeacher(mappedTeacher);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load teacher or subject");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherSubjectIdParam, router]);

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;
  if (!teacher || !teacherSubject)
    return <div className="text-center py-16">Data not found</div>;

  return (
    <TeacherSubscriptionPage
      teacher={teacher}
      teacherSubjects={[teacherSubject]}
    />
  );
}
