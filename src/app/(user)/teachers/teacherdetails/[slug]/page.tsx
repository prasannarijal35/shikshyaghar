import { notFound } from "next/navigation";
import { Metadata } from "next";
import TeacherDetails from "@/components/teacher/TeacherDetails";
import teacherService from "@/services/teacherServices";
import { Teacher } from "@/types/teacher";

type PageProps = {
  params: Promise<{ slug: string }>; // 👈 mark params as Promise
};

// Async metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params; // 👈 await params
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // 👈 also await here
  if (!slug) return notFound();

  let teacher: Teacher | null = null;
  try {
    teacher = await teacherService.getTeacherBySlug(slug);
  } catch (error) {
    console.error("Error fetching teacher by slug:", error);
  }

  if (!teacher) return notFound();

  return <TeacherDetails teacher={teacher} />;
}
