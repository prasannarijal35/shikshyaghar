"use client";

import React from "react";
import {
  CalendarDays,
  Users,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

export default function TeacherDashboard() {
  const teacherName = "Mr. Sharma";

  const todayClasses = [
    { subject: "Math", time: "9:00 AM" },
    { subject: "Physics", time: "1:30 PM" },
  ];

  const upcomingMeetings = [
    { with: "Parent (Rahul's)", time: "4:00 PM" },
    { with: "Staff Meeting", time: "5:30 PM" },
  ];

  const assignedTasks = [
    { title: "Review assignments", due: "Due by tonight" },
  ];

  const announcements = [
    "Staff meeting moved to 5:30 PM",
    "Submit grades by Friday",
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      {/* Welcome */}
      <h1 className="text-2xl font-semibold mb-6">
        Welcome, <span className="text-blue-600">{teacherName}</span>!
      </h1>

      {/* Top Grid: Classes & Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Todays Classes</h2>
          <ul className="space-y-2 text-gray-700">
            {todayClasses.map(({ subject, time }, i) => (
              <li key={i} className="flex justify-between">
                <span>{subject}</span>
                <span className="font-medium">{time}</span>
              </li>
            ))}
            {todayClasses.length === 0 && <p>No classes today!</p>}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Upcoming Meetings</h2>
          <ul className="space-y-2 text-gray-700">
            {upcomingMeetings.map(({ with: person, time }, i) => (
              <li key={i} className="flex justify-between">
                <span>{person}</span>
                <span className="font-medium">{time}</span>
              </li>
            ))}
            {upcomingMeetings.length === 0 && <p>No meetings scheduled!</p>}
          </ul>
        </section>
      </div>

      {/* Middle Grid: Tasks & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Tasks</h2>
          <ul className="space-y-2 text-gray-700">
            {assignedTasks.map(({ title, due }, i) => (
              <li key={i} className="flex justify-between">
                <span>{title}</span>
                <span className="text-red-600 font-medium">{due}</span>
              </li>
            ))}
            {assignedTasks.length === 0 && <p>No pending tasks!</p>}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Announcements</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {announcements.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
            {announcements.length === 0 && <p>No new announcements!</p>}
          </ul>
        </section>
      </div>

      {/* Quick Navigation */}
      <nav className="bg-white rounded-lg shadow p-4 flex flex-wrap justify-around gap-4 text-blue-600 font-semibold select-none">
        <button className="flex items-center gap-2 hover:text-blue-800 transition">
          <MessageSquare className="w-4 h-4" />
          Messages
        </button>
        <button className="flex items-center gap-2 hover:text-blue-800 transition">
          <ClipboardList className="w-4 h-4" />
          Attendance
        </button>
        <button className="flex items-center gap-2 hover:text-blue-800 transition">
          <Users className="w-4 h-4" />
          Students
        </button>
        <button className="flex items-center gap-2 hover:text-blue-800 transition">
          <CalendarDays className="w-4 h-4" />
          My Courses
        </button>
      </nav>
    </main>
  );
}
