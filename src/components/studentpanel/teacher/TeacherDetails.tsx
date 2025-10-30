"use client";

import Image from "next/image";
import { Teacher } from "@/types/teacher";
import {
  FaBriefcase,
  FaStar,
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTransgender,
  FaPhone,
  FaEnvelope,
  FaUserTie,
} from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import TeacherService from "@/services/teacherServices";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";

export default function TeacherDetails() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [subjects, setSubjects] = useState<TeacherSubjectAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherAndSubjects = async () => {
      setLoading(true);
      try {
        if (!slug) return;

        const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

        // Fetch teacher
        const teacherRes = await TeacherService.getTeacherBySlug(
          normalizedSlug
        );
        const fetchedTeacher = teacherRes.teacherId ? teacherRes : null;
        setTeacher(fetchedTeacher);

        // Fetch subjects
        if (fetchedTeacher?.teacherId) {
          const subjectsRes =
            await TeacherSubjectService.getAssignmentsByTeacher(
              fetchedTeacher.teacherId
            );
          setSubjects(subjectsRes.data?.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch teacher or subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherAndSubjects();
  }, [slug]);

  if (!teacher) {
    return <div className="text-center py-16">Loading teacher details...</div>;
  }

  const profilePicture = teacher.profilePicture
    ? teacher.profilePicture
    : "/placeholder-teacher.jpg";

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-5"></div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="relative">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-purple-100">
                  <Image
                    src={profilePicture}
                    alt={teacher.fullName}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    {teacher.fullName}
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                    <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {teacher.role || "Professional Teacher"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                    <FaBriefcase className="text-blue-600 text-2xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-800">
                      {teacher.experience ?? 0}+
                    </div>
                    <div className="text-sm text-blue-600 font-medium">
                      Years Exp.
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                    <FaGraduationCap className="text-purple-600 text-2xl mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-800">
                      {subjects.length}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">
                      Subjects
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                    <FaCheckCircle className="text-green-600 text-2xl mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-800 capitalize">
                      {teacher.status?.toLowerCase() ?? "Active"}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Status
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                    <FaClock className="text-orange-600 text-2xl mx-auto mb-2" />
                    <div className="text-sm font-bold text-orange-800">
                      Available
                    </div>
                    <div className="text-sm text-orange-600 font-medium">
                      Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <FaUserTie className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Professional Bio
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {teacher.bio ||
                    "Experienced educator dedicated to helping students achieve their academic goals through personalized learning approaches."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <FaGraduationCap className="text-blue-500 mr-3 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Qualification
                    </div>
                    <div className="text-gray-600">
                      {teacher.qualification || "Professional Certified"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <FaClock className="text-green-500 mr-3 text-xl" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Availability
                    </div>
                    <div className="text-gray-600">
                      {teacher.availability || "Flexible Hours"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Info</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <FaEnvelope className="text-blue-500 mr-3 text-lg" />
                <div>
                  <div className="font-medium text-gray-800">Email</div>
                  <div className="text-gray-600 text-sm">{teacher.email}</div>
                </div>
              </div>

              <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <FaPhone className="text-green-500 mr-3 text-lg" />
                <div>
                  <div className="font-medium text-gray-800">Phone</div>
                  <div className="text-gray-600 text-sm">
                    {teacher.phone || "Available on request"}
                  </div>
                </div>
              </div>

              <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <FaTransgender className="text-purple-500 mr-3 text-lg" />
                <div>
                  <div className="font-medium text-gray-800">Gender</div>
                  <div className="text-gray-600 text-sm">
                    {teacher.gender || "Not specified"}
                  </div>
                </div>
              </div>

              <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <FaBirthdayCake className="text-pink-500 mr-3 text-lg" />
                <div>
                  <div className="font-medium text-gray-800">Birth Year</div>
                  <div className="text-gray-600 text-sm">
                    {teacher.birthYear || "Private"}
                  </div>
                </div>
              </div>

              {teacher.address && (
                <div className="flex items-start p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <FaMapMarkerAlt className="text-red-500 mr-3 text-lg mt-1" />
                  <div>
                    <div className="font-medium text-gray-800">Address</div>
                    <div className="text-gray-600 text-sm">
                      {teacher.address}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Subjects I Teach
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Choose from my specialized subjects below
            </p>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="text-center py-16">Loading subjects...</div>
            ) : subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {subjects.map((s) => (
                  <div
                    key={s.id}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {s.gradeSubject.subject.name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">
                            Grade Level:
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold rounded-full">
                            {s.gradeSubject.grade.name}
                          </span>
                        </div>

                        {s.price !== undefined && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">
                              Monthly Fee:
                            </span>
                            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              Rs.{s.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        router.push(
                          `/student/teachers/subscription/create?teacherSubjectId=${s.id}`
                        )
                      }
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Subscribe Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Subjects Available Yet
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  This teacher is still setting up their subject offerings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
