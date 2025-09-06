"use client";

import Image from "next/image";
import { Teacher } from "@/types/teacher";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import teacherSubjectService, { TeacherSubjectWithDetails } from "@/services/teacherSubjectService";

interface Props {
  teacher: Teacher;
}

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
  }
  return stars;
}

export default function TeacherDetails({ teacher }: Props) {
  const [subjects, setSubjects] = useState<TeacherSubjectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const assignedSubjects = await teacherSubjectService.getSubjectsByTeacherId(teacher.id);
        setSubjects(assignedSubjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [teacher.id]);

  return (
    <div className="relative w-full min-h-screen pb-20 bg-gray-100">
      {/* Header Banner */}
      <div className="h-64 bg-gray-300 w-full"></div>

      <div className="mt-[-4rem] bg-white rounded-3xl pt-24 pb-14 px-4 sm:px-6 md:px-8 shadow-lg max-w-3xl mx-auto relative">
        {/* Profile Image */}
        <div className="absolute top-[-72px] left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/placeholder-teacher.jpg"
              alt={teacher.fullName}
              width={144}
              height={144}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Teacher Info */}
        <div className="flex flex-col gap-2 items-center text-center px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{teacher.fullName}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{teacher.role}</p>

          <div className="flex items-center justify-center gap-1 text-yellow-400 text-lg sm:text-xl">
            {renderStars(5)}
          </div>

          <div className="flex flex-col sm:flex-row justify-between w-full py-4 max-w-2xl mx-auto text-md text-gray-700 gap-8">
            <div className="space-y-3 text-left">
              <p><strong>Contact:</strong> {teacher.email}</p>
              <p><strong>Address:</strong> {teacher.address}</p>
            </div>

            <div className="space-y-3 text-left">
              <p><strong>Experience:</strong> {teacher.teacher?.experience}</p>
              <p><strong>Bio:</strong> {teacher.teacher?.bio}</p>
              <p><strong>Availability:</strong> {teacher.teacher?.availability}</p>
            </div>
          </div>

          {/* Subjects Taught */}
          <div className="w-full max-w-2xl mt-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">Subjects Taught</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {loading ? (
                <span className="px-3 py-1 bg-gray-100 border rounded-full text-sm text-gray-800">
                  Loading subjects...
                </span>
              ) : subjects.length > 0 ? (
                subjects.map((s) => (
                  <span
                    key={s.teacherSubjectId}
                    className="px-3 py-1 bg-green-500/30 text-green-600 rounded-lg text-sm"
                  >
                    {s.gradeSubject.subject.name} - Grade {s.gradeSubject.grade.name}
                  </span>
                ))
              ) : (
                <span className="px-3 py-1 bg-gray-100 border rounded-full text-sm text-gray-800">
                  No subjects assigned
                </span>
              )}
            </div>
          </div>

          {/* Subscribe */}
          <Link
            href={"/subscribe"}
            className="mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition duration-200 text-sm sm:text-base"
            onClick={() => alert(`Booking request sent for ${teacher.fullName}`)}
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}
