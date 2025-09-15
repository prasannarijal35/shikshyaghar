"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Teacher } from "@/types/teacher";
import toast from "react-hot-toast";
import TeacherDetails from "@/components/teacher/TeacherDetails";
import teacherService from "@/services/teacherServices";
import Breadcrumb from "@/components/common/BreadCrumb";

export default function TeacherDetailsPage() {
  const { slug } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const teacherSlug = Array.isArray(slug) ? slug[0] : slug;

    teacherService
      .getTeacherBySlug(teacherSlug)
      .then((data) => setTeacher(data))
      .catch((err: any) => {
        if (err.response?.status === 404) toast.error("Teacher not found");
        else toast.error("Failed to fetch teacher details");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!teacher) return <p className="text-center mt-20">Teacher not found</p>;

  return (
    <>
      <Breadcrumb title="Teacher Profile" />
      <TeacherDetails />
    </>
  );
}
