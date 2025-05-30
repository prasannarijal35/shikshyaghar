"use client";

import React from "react";
import {
  Users,
  BookOpenCheck,
  Bell,
  ClipboardList,
  FileText,
  User,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboard() {
  const adminName = "Admin Sanjeev";

  const students = [
    { name: "Alice", enrolled: "Math, Science" },
    { name: "Bob", enrolled: "English, Physics" },
  ];

  const teachers = [
    { name: "Mr. Sharma", subject: "Math" },
    { name: "Ms. Kiran", subject: "English" },
  ];

  const reports = [
    "3 new student registrations",
    "1 teacher left feedback",
    "System maintenance scheduled",
  ];

  const cardStyle =
    "bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200";

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6 sm:p-8 md:p-12">
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome, <span className="text-purple-600">{adminName}</span>!
      </h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Students Overview */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Students Overview
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {students.map(({ name, enrolled }, i) => (
              <li key={i} className="flex justify-between">
                <span>{name}</span>
                <span className="text-sm text-gray-500">{enrolled}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Teachers Overview */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpenCheck className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Teachers Overview
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            {teachers.map(({ name, subject }, i) => (
              <li key={i} className="flex justify-between">
                <span>{name}</span>
                <span className="text-sm text-gray-500">{subject}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* System Reports */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {reports.length > 0 ? (
              reports.map((report, i) => <li key={i}>{report}</li>)
            ) : (
              <p className="text-gray-500">No reports available.</p>
            )}
          </ul>
        </section>

        {/* Notifications */}
        <section className={cardStyle}>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-purple-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <p className="text-gray-600">System is running smoothly. No alerts.</p>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white rounded-2xl shadow p-5 flex flex-wrap justify-around gap-4 text-purple-600 font-medium text-sm sm:text-base">
        <button className="flex items-center gap-1 hover:text-purple-800 transition">
          <FileText size={18} /> Reports
        </button>
        <button className="flex items-center gap-1 hover:text-purple-800 transition">
          <User size={18} /> Manage Users
        </button>
        <button className="flex items-center gap-1 hover:text-purple-800 transition">
          <ShieldCheck size={18} /> Security
        </button>
        <button className="flex items-center gap-1 hover:text-purple-800 transition">
          <LifeBuoy size={18} /> Support
        </button>
      </nav>
    </main>
  );
}
