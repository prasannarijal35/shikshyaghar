// app/(user)/teachers/teacherdetails/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import TeacherDetails from "@/components/teacher/TeacherDetails";
import teacherService from "@/services/teacherServices";

type PageProps = {
  params: { slug: string };
};

// Async metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const teacher = await teacherService.getTeacherBySlug(params.slug);
    if (!teacher) return { title: "Teacher Not Found", description: "No teacher found" };

    return {
      title: `Shikshya Ghar | ${teacher.fullName}`,
      description: `Detailed view of ${teacher.fullName}'s profile`,
    };
  } catch {
    return { title: "Teacher Not Found", description: "No teacher found" };
  }
}

export default async function Page({ params }: PageProps) {
  const slug = params?.slug;
  if (!slug) return notFound();

  let teacher;
  try {
    teacher = await teacherService.getTeacherBySlug(slug);
  } catch (error) {
    console.error(error);
  }

  if (!teacher) return notFound();

  // Ensure placeholder image exists

  return <TeacherDetails teacher={teacher} />;
}