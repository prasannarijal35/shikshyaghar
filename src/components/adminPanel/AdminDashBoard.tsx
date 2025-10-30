"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  Users,
  Hash,
  Sparkles,
  MessageSquareWarning,
  LayoutGrid,
  User,
  Book,
  FileText,
} from "lucide-react";

import teacherService from "@/services/teacherServices";
import gradeService from "@/services/gradeServices";
import subjectService from "@/services/subjectServices";
import blogService from "@/services/blogServices";
import reviewService from "@/services/reviewServices";
import studentService from "@/services/studentService";

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalGrades: number;
  totalSubjects: number;
  totalBlogs: number;
  pendingReviews: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "purple" | "green" | "red";
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const colorMap = {
    blue: { gradient: "from-blue-100 to-blue-200", text: "text-blue-600" },
    purple: {
      gradient: "from-purple-100 to-indigo-200",
      text: "text-purple-600",
    },
    green: {
      gradient: "from-green-100 to-emerald-200",
      text: "text-green-600",
    },
    red: { gradient: "from-red-100 to-rose-200", text: "text-red-600" },
  };
  const { gradient, text } = colorMap[color];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group">
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} ${text} opacity-80 group-hover:opacity-100 transition-opacity`}
        >
          {React.cloneElement(icon as React.ReactElement<any>, {
            size: 24,
            className: text,
          })}
        </div>
        <p className="text-3xl font-extrabold text-gray-900 leading-none">
          {value.toLocaleString()}
        </p>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentTeachers, setRecentTeachers] = useState<any[]>([]);
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [topBlogs, setTopBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [students, teachers, grades, subjects, blogs, reviews] =
          await Promise.all([
            studentService.getAllStudents(),
            teacherService.getAllTeachers(),
            gradeService.getAllGrades(),
            subjectService.getAllSubjects(),
            blogService.getAllBlogs(),
            reviewService.getAllReviews(),
          ]);

        // --- STUDENTS ---

        // --- DASHBOARD STATS ---
        const dashboardData: DashboardStats = {
          totalStudents: students.data.length,
          totalTeachers: Array.isArray(teachers) ? teachers.length : 0,
          totalGrades: Array.isArray(grades) ? grades.length : 0,
          totalSubjects: Array.isArray(subjects) ? subjects.length : 0,
          totalBlogs: Array.isArray(blogs) ? blogs.length : 0,
          pendingReviews: Array.isArray(reviews) ? reviews.length : 0,
        };
        setStats(dashboardData);

        // --- Recent Students ---
        const sortedStudents = students.data
          .slice()
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
          )
          .slice(0, 5);
        setRecentStudents(sortedStudents);

        // --- Recent Teachers ---
        const sortedTeachers = Array.isArray(teachers)
          ? teachers
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0).getTime() -
                  new Date(a.createdAt || 0).getTime()
              )
              .slice(0, 5)
          : [];
        setRecentTeachers(sortedTeachers);

        // --- Top Blogs ---
        const topBlogsArr = Array.isArray(blogs)
          ? blogs
              .slice()
              .sort((a, b) => (b.views || 0) - (a.views || 0))
              .slice(0, 5)
          : [];
        setTopBlogs(topBlogsArr);
      } catch (err) {
        console.error("Dashboard load error:", err);
        toast.error("Failed to load dashboard data");
        setStats({
          totalStudents: 0,
          totalTeachers: 0,
          totalGrades: 0,
          totalSubjects: 0,
          totalBlogs: 0,
          pendingReviews: 0,
        });
        setRecentStudents([]);
        setRecentTeachers([]);
        setTopBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600 text-xl font-medium">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const dashboardMetrics: StatCardProps[] = stats
    ? [
        {
          label: "Total Students",
          value: stats.totalStudents,
          icon: <Users />,
          color: "blue",
        },
        {
          label: "Total Teachers",
          value: stats.totalTeachers,
          icon: <User />,
          color: "blue",
        },
        {
          label: "Total Grades",
          value: stats.totalGrades,
          icon: <Hash />,
          color: "purple",
        },
        {
          label: "Total Subjects",
          value: stats.totalSubjects,
          icon: <Book />,
          color: "purple",
        },
        {
          label: "Total Blogs",
          value: stats.totalBlogs,
          icon: <FileText />,
          color: "green",
        },
        {
          label: "Pending Reviews",
          value: stats.pendingReviews,
          icon: <MessageSquareWarning />,
          color: "red",
        },
      ]
    : [];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* HEADER */}
      <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <div className="flex items-center space-x-4">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back, Admin
            </h1>
            <p className="text-gray-600 mt-1 text-lg">
              Overview of your platform’s key metrics.
            </p>
          </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-gray-500" /> System Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardMetrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>

      {/* RECENT DATA SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT TEACHERS */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Teacher Registrations
          </h3>
          {recentTeachers.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No recent teacher registrations.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentTeachers.map((t: any, i: number) => (
                <li key={i} className="py-3 flex justify-between">
                  <span className="font-medium text-gray-700">
                    {t.fullName || "Unnamed Teacher"}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {t.email || "—"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RECENT STUDENTS */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Student Registrations
          </h3>
          {recentStudents.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No recent student registrations.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentStudents.map((s: any, i: number) => (
                <li
                  key={i}
                  className="py-3 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {s.fullName || "Unnamed Student"}
                    </p>
                    <p className="text-gray-500 text-sm">{s.email || "—"}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {s.createdAt
                      ? new Date(s.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* TOP BLOGS */}
      <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Top Blog Posts
        </h3>
        {topBlogs.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No blog posts found.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {topBlogs.map((b: any, i: number) => (
              <li key={i} className="py-3 flex justify-between">
                <span className="font-medium text-gray-700">
                  {b.title || `Blog #${i + 1}`}
                </span>
                <span className="text-gray-500 text-sm">
                  {b.views ? `${b.views} views` : "—"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
