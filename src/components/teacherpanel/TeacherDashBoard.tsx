"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  ClipboardList,
  CalendarDays,
  BookOpen,
  FileText,
  User,
  LifeBuoy,
  RefreshCw,
  Hourglass,
  GraduationCap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getUser } from "@/utils/localStorage";
import useSubscriptionService from "@/services/subscriptionServices";
import TeacherSubjectService from "@/services/teacherSubjectServices";

export default function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState<string>("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingStudents, setPendingStudents] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [loading, setLoading] = useState(true);

  const subscriptionService = useSubscriptionService();

  useEffect(() => {
    const user = getUser();
    if (user) setTeacherName(user.fullName || "Teacher");

    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Fetch subscriptions
        const subsResponse = await subscriptionService.getByTeacherId();
        const subscriptions = subsResponse?.subscriptions || [];

        const activeStudents = subscriptions.filter(
          (sub: any) => sub.status === "ACTIVE"
        ).length;

        const pending = subscriptions.filter(
          (sub: any) => sub.status === "PENDING"
        ).length;

        setTotalStudents(activeStudents);
        setPendingStudents(pending);

        // ✅ Fetch teacher’s classes
        if (!user?.teacher?.id) {
          toast.error("Teacher profile not found!");
          setLoading(false);
          return;
        }

        const res = await TeacherSubjectService.getAssignmentsByTeacher(
          user.teacher.id
        );
        const classes = res.data?.items || [];
        setTotalClasses(classes.length);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardStyle =
    "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 md:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-primary">{teacherName}</span>!
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">
          Loading dashboard...
        </p>
      ) : (
        <>
          {/* Top Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {/* Total Active Students */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-primary" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">
                  Active Students
                </h2>
              </div>
              <p className="text-3xl font-bold text-gray-700">
                {totalStudents}
              </p>
            </section>

            {/* My Classes */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="text-green-600" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">
                  My Classes
                </h2>
              </div>
              <p className="text-3xl font-bold text-gray-700">
                {totalClasses}
              </p>
            </section>

            {/* Pending Students */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <Hourglass className="text-yellow-500" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">
                  Pending Students
                </h2>
              </div>
              <p className="text-3xl font-bold text-gray-700">
                {pendingStudents}
              </p>
            </section>
          </div>

          {/* My Courses Section */}
          <section className={cardStyle + " mb-10"}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-primary" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">
                My Courses
              </h2>
            </div>
            {totalClasses === 0 ? (
              <p className="text-gray-500">No courses assigned yet.</p>
            ) : (
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You currently have {totalClasses} active classes.</li>
                <li>Each class may have multiple students enrolled.</li>
              </ul>
            )}
          </section>

          {/* Quick Navigation */}
          <nav className="bg-white rounded-2xl shadow p-5 flex flex-wrap justify-around gap-4 text-primary font-medium text-sm sm:text-base">
            <Link
              href="/teacher/students"
              className="flex items-center gap-1 hover:text-blue-800 transition"
            >
              <Users size={18} /> Students
            </Link>

            <Link
              href="/teacher/teacherSubject"
              className="flex items-center gap-1 hover:text-blue-800 transition"
            >
              <GraduationCap size={18} /> Classes
            </Link>

            <Link
              href="/teacher/profile"
              className="flex items-center gap-1 hover:text-blue-800 transition"
            >
              <User size={18} /> Profile
            </Link>

            <Link
              href="/support"
              className="flex items-center gap-1 hover:text-blue-800 transition"
            >
              <LifeBuoy size={18} /> Support
            </Link>
          </nav>
        </>
      )}
    </main>
  );
}
