"use client";

import Image from "next/image";
import Link from "next/link";
import { Teacher } from "@/types/teacher";

type Props = {
  teacher: Teacher;
};

const SingleTeacherCard = ({ teacher }: Props) => {
  const t = teacher.teacher;

  // Fallback if profilePicture is null/undefined or invalid
  const profilePicture = t?.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${t.profilePicture.replace(/^undefined\//, "")}`
    : "/placeholder-teacher.jpg"; // <-- make sure you have this in /public folder

  return (
    <div className="bg-white flex flex-col md:flex-row items-center p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow w-full gap-5">
      
      {/* Teacher Image */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
        <Image
          src={profilePicture}
          alt={teacher.fullName}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Teacher Info */}
      <div className="flex-1 space-y-1 text-sm">
        <h3 className="font-semibold text-xl text-gray-900">{teacher.fullName}</h3>
        <p className="text-gray-600">📍 {teacher.address || "Not provided"}</p>
        <p className="text-gray-600">💬 Bio: {t?.bio || "No bio provided"}</p>
        <p className="text-gray-600">🏫 Experience: {t?.experience ?? 0} years</p>
        <p className="text-gray-600">👤 Gender: {teacher.gender || "Not specified"}</p>

        {t?.teacherSubjects?.length > 0 ? (
          <ul className="flex flex-wrap text-gray-600 mt-2 gap-2">
            {t.teacherSubjects.map((s) => (
              <li
                key={s.id}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {s.gradeSubject.subject.name} - Grade {s.gradeSubject.grade.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">No subjects assigned</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 md:ml-5">
        <Link
          href={`/teachers/teacherdetails/${teacher.slug}`}
          className="text-md border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300 text-center font-semibold"
        >
          View Profile
        </Link>
        <button
          onClick={() => alert(`Booking request sent to ${teacher.fullName}`)}
          className="text-md border border-primary bg-primary text-white px-4 py-2 rounded-lg transition duration-300 font-semibold
           hover:bg-white hover:text-primary">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SingleTeacherCard;
