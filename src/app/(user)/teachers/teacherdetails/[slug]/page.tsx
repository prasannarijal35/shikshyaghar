import { notFound } from "next/navigation";
import { Metadata } from "next";
import TeacherDetails from "@/components/teacher/TeacherDetails";
import teacherService from "@/services/teacherServices";
import { Teacher } from "@/types/teacher";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Async metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const teacher: Teacher | null = await teacherService.getTeacherBySlug(slug);

    if (!teacher) {
      return { title: "Teacher Not Found", description: "No teacher found" };
    }

    return {
      title: `Shikshya Ghar | ${teacher.fullName}`,
      description: `Detailed view of ${teacher.fullName}'s profile`,
    };
  } catch {
    return { title: "Teacher Not Found", description: "No teacher found" };
  }
}

// Teacher details page
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  const teacher: Teacher | null = await teacherService.getTeacherBySlug(slug);
  if (!teacher) return notFound();

  // TeacherDetails now handles subjects internally
  return <TeacherDetails teacher={teacher} />;
}
