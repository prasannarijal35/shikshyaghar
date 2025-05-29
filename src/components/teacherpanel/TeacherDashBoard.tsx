"use client";

import React from "react";

export default function TeacherDashboard() {
  const teacherName = "Mr. Sharma"; // Example name

  // Dummy data (replace with real API/data)
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

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Today's Classes */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Todayapos;s Classes</h2>
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

        {/* Upcoming Meetings */}
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

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Tasks / To-do */}
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

        {/* Announcements */}
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

      {/* Bottom Navigation / Quick Links */}
      <nav className="bg-white rounded-lg shadow p-4 flex justify-around text-blue-600 font-semibold select-none">
        <button className="hover:text-blue-800 transition">Messages</button>
        <button className="hover:text-blue-800 transition">Attendance</button>
        <button className="hover:text-blue-800 transition">Students</button>
        <button className="hover:text-blue-800 transition">Support</button>
      </nav>
    </main>
  );
}
