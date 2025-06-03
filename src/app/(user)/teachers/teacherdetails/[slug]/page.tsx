import { teachers } from "@/data/teacher";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TeacherDetails } from "@/components/teacher";

export const metadata: Metadata = {
  title: "Shikshya Ghar | Teacher Profile",
  description: "Detailed view of a teacher profile",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let teacher;
  try {
    teacher = await Promise.resolve(teachers.find((t) => t?.slug === slug));
  } catch (error) {
    console.error(error);
  }

  if (!teacher) return notFound();

  return <TeacherDetails teacher={teacher} />;
}
