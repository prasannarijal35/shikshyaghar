"use client";

import Image from "next/image";
import { Teacher } from "@/types/teacher";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserTie,
  FaTransgender,
  FaBirthdayCake,
} from "react-icons/fa";

interface Props {
  teacher: Teacher;
}

export default function TeacherDetails({ teacher }: Props) {
  const t = teacher.teacher;

  // Fallback for profile picture
  const profilePicture = t?.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${t.profilePicture.replace(
        /^undefined\//,
        ""
      )}`
    : "/placeholder-teacher.jpg";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Main Profile Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          {/* Profile Image & Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 -mt-24 md:-mt-12 md:mr-8">
              <Image
                src={profilePicture}
                alt={teacher.fullName}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="mt-6 md:mt-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {teacher.fullName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Role: {teacher.role}
              </p>
              <div className="flex justify-center md:justify-start items-center mt-2 text-yellow-400 text-xl sm:text-2xl">
                ★★★★★
              </div>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* About */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
              <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                <FaUserTie className="mr-2 text-primary" />
                About
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <FaBriefcase className="mr-2 text-primary" />
                  <strong className="mr-2">Experience:</strong>{" "}
                  {t?.experience ?? "Not provided"} years
                </p>
                <p>
                  <strong className="block mb-1">Bio:</strong>{" "}
                  {t?.bio || "No bio provided."}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  {t?.availability || "Not specified"}
                </p>
                <p>
                  <strong>Qualification:</strong>{" "}
                  {t?.qualification || "Not specified"}
                </p>
                <p>
                  <strong>Status:</strong> {t?.status}
                </p>
              </div>
            </div>

            {/* Contact & Personal */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
              <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                <FaMapMarkerAlt className="mr-2 text-primary" />
                Contact & Personal Info
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-primary" />
                  <strong className="mr-2">Email:</strong> {teacher.email}
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-primary" />
                  <strong className="mr-2">Contact:</strong>{" "}
                  {teacher.phone || "Not provided"}
                </p>
                <p className="flex items-center">
                  <FaTransgender className="mr-2 text-primary" />
                  <strong className="mr-2">Gender:</strong>{" "}
                  {teacher.gender || "Not specified"}
                </p>
                <p className="flex items-center">
                  <FaBirthdayCake className="mr-2 text-primary" />
                  <strong className="mr-2">Birth Year:</strong>{" "}
                  {teacher.birthYear || "Not provided"}
                </p>
                <p>
                  <strong>Address:</strong> {teacher.address}
                </p>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-inner text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Subjects Taught
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {t?.teacherSubjects?.length > 0 ? (
                t.teacherSubjects.map((s) => (
                  <span
                    key={s.id}
                    className="px-4 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded-full font-medium text-sm transition-transform transform hover:scale-105"
                  >
                    {s.gradeSubject.subject.name} - Grade{" "}
                    {s.gradeSubject.grade.name}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 italic">No subjects assigned</p>
              )}
            </div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-8">
          <Link
            href="/subscribe"
            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-full text-lg shadow-lg hover:bg-primary/90 transition duration-300 transform hover:scale-105"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
}
