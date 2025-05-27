"use client";

import Image from "next/image";
import Link from "next/link";
import { Teacher } from "@/types/teacher";
import { AiFillStar } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";

type Props = {
  teacher: Teacher;
};

const TeacherCard = ({ teacher }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Image on Top */}
        <Link href={`/teacherdetails/${teacher.slug}`}>
          <div className="w-full h-56 relative rounded-2xl overflow-hidden">
            <Image
              src={teacher.photo}
              alt={teacher.name}
              fill
              className="object-cover"
              quality={100}
              priority
            />
          </div>
        </Link>

        {/* Text Content Below Image */}
        <div className="flex flex-col gap-3 text-gray-800">
          {/* Name + Verified */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Link
                href={`/teacherdetails/${teacher.slug}`}
                className="hover:text-primary"
              >
                {teacher.name}
              </Link>
              <BsFillPatchCheckFill className="text-green-600 text-lg" />
            </h3>
          </div>

          {/* Subject and Experience - in a row with labels */}
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              <span className="font-medium text-gray-800">Subject:</span>{" "}
              {teacher.subjects}
            </span>
            <span>
              <span className="font-medium text-gray-800">Experience:</span>{" "}
              {teacher.teachingExperience}
            </span>
          </div>

          {/* Rating and Book Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-sm">
              <AiFillStar className="text-yellow-500 text-base" />
              <span className="font-semibold text-gray-900">5.0</span>
              <span className="text-gray-600">(12 Reviews)</span>
            </div>
            <button
              className="px-4 py-2 text-sm font-medium border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
              onClick={() => {
                alert("Book a free trial clicked!");
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
