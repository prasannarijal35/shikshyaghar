"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  ClipboardList,
  BookOpen,
  Bell,
  FileText,
  User,
  LifeBuoy,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getUser } from "@/utils/localStorage";
import useSubscriptionService from "@/services/subscriptionServices";
import teacherService from "@/services/teacherServices";
import { SubscriptionType } from "@/types/subscription";
import { Teacher } from "@/types/teacher";
import { FaChampagneGlasses } from "react-icons/fa6";

export default function StudentDashboard() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const subscriptionService = useSubscriptionService();
  const user = getUser();
  const studentName = user?.fullName || "Student";

  // Fetch data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const subsData = await subscriptionService.getByStudentId();
      const teachersData = await teacherService.getAllTeachers();

      setSubscriptions(Array.isArray(subsData) ? subsData : []);
      setTeachers(Array.isArray(teachersData) ? teachersData.slice(0, 3) : []); // show top 3
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardStyle =
    "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 md:p-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-primary">{studentName}</span>!
        </h1>
        <button
          onClick={fetchDashboardData}
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
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Active Classes */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">
                  My Active Classes
                </h2>
              </div>
              {subscriptions.length > 0 ? (
                <ul className="space-y-3 text-gray-700">
                  {subscriptions.slice(0, 4).map((sub) => (
                    <li key={sub.id} className="flex justify-between">
                      <span>{sub.subjectName}</span>
                      <span className="text-sm text-gray-500">
                        {sub.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No active subscriptions.</p>
              )}
            </section>

            {/* Teachers */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Recommended Teachers
                </h2>
              </div>
              {teachers.length > 0 ? (
                <ul className="space-y-3 text-gray-700">
                  {teachers.map((teacher) => (
                    <li
                      key={teacher.id}
                      className="flex justify-between border-b pb-2 last:border-b-0"
                    >
                      <span>{teacher.fullName}</span>
                      <span className="text-sm text-gray-500">
                        {teacher.subjects?.[0]?.subject || "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No teachers available.</p>
              )}
            </section>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Progress / Stats */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">
                  My Learning Progress
                </h2>
              </div>
              <p className="text-gray-600 mb-2">
                Active Courses: {subscriptions.length}
              </p>
              <p className="text-gray-600">
                Teachers Engaged: {teachers.length}
              </p>
            </section>

            {/* Notifications Placeholder */}
            <section className={cardStyle}>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="text-primary" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Notifications
                </h2>
              </div>
              <p className="text-gray-500">No new notifications yet.</p>
            </section>
          </div>

          {/* Bottom Navigation */}
          <nav className="bg-white rounded-2xl shadow p-5 flex flex-wrap justify-around gap-4 text-primary font-medium text-sm sm:text-base">
            <button className="flex items-center gap-1 hover:text-blue-800 transition">
              <FaChampagneGlasses size={18} /> Myclasses
            </button>
            <button className="flex items-center gap-1 hover:text-blue-800 transition">
              <FileText size={18} /> Resources
            </button>
            <button className="flex items-center gap-1 hover:text-blue-800 transition">
              <User size={18} /> Profile
            </button>
            <button className="flex items-center gap-1 hover:text-blue-800 transition">
              <LifeBuoy size={18} /> Support
            </button>
          </nav>
        </>
      )}
    </main>
  );
}
