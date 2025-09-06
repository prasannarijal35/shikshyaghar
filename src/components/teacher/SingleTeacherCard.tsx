"use client";

import Image from "next/image";
import Link from "next/link";
import { Teacher } from "@/types/teacher";
import { TeacherSubjectWithDetails } from "@/types/teacherSubject";

type Props = {
  teacher: Teacher;
};

const SingleTeacherCard = ({ teacher }: Props) => {
  console.log(teacher);
  return (
    <div className="bg-white flex items-center p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow w-full">
      <div className="w-32 h-32 relative rounded-lg overflow-hidden mr-5 flex-shrink-0 shadow-sm">
        <Image
          src="/placeholder-teacher.jpg"
          alt={teacher.fullName}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 space-y-1 text-sm">
        <h3 className="font-semibold text-xl text-gray-900">{teacher.fullName}</h3>
        <p className="text-gray-600">{teacher.role}</p>
        <p className="text-gray-600">📍 {teacher.address}</p>
        <p className="text-gray-600">💬 Bio: {teacher.teacher.bio}</p>
        <p className="text-gray-600">🏫 Experience: {teacher.teacher.experience}</p>
        <p className="text-gray-600">⏰ Availability: {teacher.teacher.availability}</p>

        {teacher.teacher.teacherSubject.length > 0 ? (
          <ul className="flex flex-wrap text-gray-600 mt-2">
            {teacher.teacher.teacherSubject.map((s) => (
              <li key={s.id} className="px-2 py-1 bg-green-500/30 text-green-500 rounded-lg">
                {s.gradeSubject.subject.name} - Grade {s.gradeSubject.grade.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic mt-2">No subjects assigned</p>
        )}
      </div>

      <div className="ml-5 flex flex-col gap-4">
        <Link
          href={`/teachers/teacherdetails/${teacher.slug}`}
          className="text-md border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300 text-center"
        >
          View Profile
        </Link>
        <button
          onClick={() => alert(`Booking request sent to ${teacher.fullName}`)}
          className="text-md border border-primary bg-primary text-white px-4 py-2 rounded-lg hover:text-primary hover:bg-white transition duration-300"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default SingleTeacherCard;
