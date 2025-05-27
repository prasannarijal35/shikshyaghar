import { teachers } from "@/data/teacher";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TeacherDetails } from "@/components/teacher";

export const metadata: Metadata = {
  title: "Shikshya Ghar | Teacher Profile",
  description: "Detailed view of a teacher profile",
};

export default function Page({ params }: { params: { slug: string } }) {
  const teacher = teachers.find((t) => t.slug === params.slug);

  if (!teacher) return notFound();

  return <TeacherDetails teacher={teacher} />;
}
