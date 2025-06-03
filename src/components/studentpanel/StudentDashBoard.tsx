"use client";

import React from "react";
import {
  Calendar,
  ClipboardList,
  BookOpen,
  Bell,
  MessageCircle,
  FileText,
  User,
  LifeBuoy,
} from "lucide-react";

export default function StudentDashboard() {
  const studentName = "Sanjeev";

  const upcomingClasses = [
    { subject: "Math", time: "10:00 AM" },
    { subject: "English", time: "2:00 PM" },
  ];

  const assignments = [{ title: "Science HW", due: "Due tomorrow" }];

  const courses = [
    { name: "Algebra 101", progress: 75 },
    { name: "Physics", progress: 50 },
  ];

  const notifications = ["New exam on Fri", "Assignment graded"];

  const cardStyle =
    "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 sm:p-8 md:p-12">
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome, <span className="text-primary">{studentName}</span>!
      </h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Upcoming Classes */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-primary" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Upcoming Classes
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {upcomingClasses.map(({ subject, time }, i) => (
              <li key={i} className="flex justify-between">
                <span>{subject}</span>
                <span className="font-medium">{time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Assignments */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="text-primary" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {assignments.length > 0 ? (
              assignments.map(({ title, due }, i) => (
                <li key={i} className="flex justify-between">
                  <span>{title}</span>
                  <span className="text-red-600 font-medium">{due}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No pending assignments!</p>
            )}
          </ul>
        </section>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Courses */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-primary" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Courses</h2>
          </div>
          <ul className="space-y-5">
            {courses.map(({ name, progress }, i) => (
              <li key={i}>
                <div className="flex justify-between text-gray-700 font-medium mb-1">
                  <span>{name}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Notifications */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-primary" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {notifications.length > 0 ? (
              notifications.map((note, i) => <li key={i}>{note}</li>)
            ) : (
              <p className="text-gray-500">No new notifications!</p>
            )}
          </ul>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white rounded-2xl shadow p-5 flex flex-wrap justify-around gap-4 text-primary font-medium text-sm sm:text-base">
        <button className="flex items-center gap-1 hover:text-blue-800 transition">
          <MessageCircle size={18} /> Messages
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
    </main>
  );
}
