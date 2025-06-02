"use client";

import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { Teacher } from "@/types/teacher";

type Props = {
  teacher: Teacher;
};

const TeacherCard = ({ teacher }: Props) => {
  return (
    <div className="bg-white flex items-center p-5 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow w-full">
      {/* Teacher Image */}
      <div className="w-32 h-32 relative rounded-lg overflow-hidden mr-5 flex-shrink-0 shadow-sm">
        <Image
          src={teacher.photo}
          alt={teacher.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-1 text-sm">
        <h3 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
          {teacher.name}
        </h3>
        <p className="text-gray-600">
          {teacher.gender}, {teacher.age} years
        </p>
        <p className="text-gray-600">🎓 {teacher.education}</p>
        <p className="text-gray-600">
          🏫 {teacher.teachingExperience} experience
        </p>
        <p className="text-gray-600">
          📚 Subjects: {teacher.subjects.join(", ")}
        </p>
        <div className="flex items-center gap-1 mt-2">
          <AiFillStar className="text-yellow-400 text-base" />
          <span className="font-semibold text-gray-900">{teacher.rating}</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="ml-5 flex flex-col gap-4">
        <Link
          href={`/teachers/teacherdetails/${teacher.slug}`}
          className="text-md border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300 text-center"
        >
          View Profile
        </Link>
        <button
          onClick={() => alert(`Booking request sent to ${teacher.name}`)}
          className="text-md border border-primary bg-primary text-white px-4 py-2 rounded-lg hover:text-primary hover:bg-white transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TeacherCard;
