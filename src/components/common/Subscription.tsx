"use client";

import { useState } from "react";
import { Teacher } from "@/types/teacher";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import useSubscriptionService from "@/services/subscriptionServices";
import { getUser } from "@/utils/localStorage";
import toast from "react-hot-toast";
import { SubscriptionType } from "@/types/subscription";
import { Check, Star, Users, Award, BookOpen } from "lucide-react";
import Image from "next/image";

interface Props {
  teacher: Teacher;
  teacherSubjects: TeacherSubjectAssignment[];
}

export default function TeacherSubscriptionPage({
  teacher,
  teacherSubjects,
}: Props) {
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );

  const subscriptionService = useSubscriptionService();

  const handleSubscribe = async (
    teacherSubjectId: number,
    totalPrice: number
  ) => {
    setLoading(true);
    setSelectedSubjectId(teacherSubjectId);

    try {
      const user = getUser();
      if (!user || user.role !== "student") {
        toast.error("You must be logged in as a student to subscribe");
        return;
      }

      const payload: Partial<SubscriptionType> = {
        teacherSubjectId,
        duration: selectedDuration,
        studentId: user.student?.id,
      };

      const subscription: SubscriptionType = await subscriptionService.create(
        payload
      );

      toast.success(
        `Subscription created successfully! Total: Rs.${totalPrice.toLocaleString()}`
      );
      console.log("Subscription:", subscription);

      // Redirect after successful subscription
      window.location.href = "/student/subscription";

    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error(
          err.response.data?.error ||
            "You already have a subscription for this subject"
        );
      } else {
        toast.error(
          err.response?.data?.error || "Failed to create subscription"
        );
      }
      console.error(err);
    } finally {
      setLoading(false);
      setSelectedSubjectId(null);
    }
  };

  const features = [
    "Personalized one-on-one tutoring sessions",
    "Flexible scheduling for each subject",
    "Track your learning progress",
    "Interactive assignments and feedback",
    "Exam and test preparation support",
    "24/7 doubt clearing and Q&A support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Premium Subscription
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized tutoring from experienced educators and achieve
            your academic goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Teacher Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={
                      teacher.profilePicture ||
                      "https://images.unsplash.com/photo-1494790108755-2616c643c2f4?w=400&h=400&fit=crop&crop=face"
                    }
                    alt={teacher.fullName}
                    fill
                    className="rounded-full object-cover ring-4 ring-blue-100"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {teacher.fullName}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {teacher.qualification}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                  {teacher.experience && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {teacher.experience}+ years
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Expert Teacher
                  </div>
                </div>
              </div>

              {teacher.bio && (
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    About Teacher
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Subjects & Plans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  Choose Your Subject & Plan
                </h2>
                <p className="text-blue-100">
                  Select from available subjects and duration
                </p>
              </div>

              <div className="p-8">
                {/* Duration Selector */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Duration
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 6].map((months) => (
                      <button
                        key={months}
                        onClick={() => setSelectedDuration(months)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          selectedDuration === months
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {months} Month{months > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subjects List */}
                {teacherSubjects.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Subjects Available Yet
                    </h3>
                    <p className="text-gray-600">
                      This teacher hasn&apos;t added any subjects yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {teacherSubjects.map((subject) => {
                      const totalPrice =
                        (subject.price || 0) * selectedDuration;

                      return (
                        <div
                          key={subject.id}
                          className="border-2 border-gray-200 rounded-3xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="grid md:grid-cols-2 gap-6 items-center">
                            {/* Subject Info */}
                            <div>
                              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <BookOpen className="w-5 h-5 text-blue-600" />
                                  <span className="font-semibold text-gray-900">
                                    Subject Details
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                  {subject.gradeSubject.subject.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                  {subject.gradeSubject.grade.name}
                                </p>
                                {subject.price && (
                                  <p className="text-blue-600 font-bold text-lg">
                                    Rs.{subject.price.toLocaleString()} / month
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                {features.slice(0, 3).map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                                <div className="text-xs text-gray-500">
                                  +3 more features included
                                </div>
                              </div>
                            </div>

                            {/* Pricing & Subscribe */}
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
                              <div className="text-sm text-gray-600 mb-2">
                                Total for {selectedDuration} month
                                {selectedDuration > 1 ? "s" : ""}
                              </div>
                              <div className="text-3xl font-bold text-gray-900 mb-1">
                                Rs. {totalPrice.toLocaleString()}
                              </div>

                              <button
                                onClick={() =>
                                  handleSubscribe(subject.id, totalPrice)
                                }
                                disabled={
                                  loading && selectedSubjectId === subject.id
                                }
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                              >
                                {loading && selectedSubjectId === subject.id ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                  </div>
                                ) : (
                                  `Subscribe - Rs. ${totalPrice.toLocaleString()}`
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
