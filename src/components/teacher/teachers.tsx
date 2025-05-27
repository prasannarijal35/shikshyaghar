import Link from "next/link";
import TeacherCard from "@/components/teacher/SingleTeacherCard";
import { teachers } from "@/data/teacher";

const TeacherPreviewPage = () => {
  return (
    <section className="container max-w-6xl mx-auto py-20 pb-36">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Featured Teachers</h1>
        <Link
          href="/teachers"
          className="inline-flex items-center text-primary font-semibold gap-2 px-4 py-2 rounded-md hover:bg-primary/10 transition duration-300 ease-in-out"
        >
          View More
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {teachers.slice(0, 3).map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </section>
  );
};

export default TeacherPreviewPage;
