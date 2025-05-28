"use client";

import React from "react";

interface StudentSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function StudentSidebar({
  isSidebarOpen,
  toggleSidebar,
}: StudentSidebarProps) {
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-30 transform transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-200">
          Menu
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a
            href="/student/dashboard"
            className="px-3 py-2 rounded hover:bg-blue-100"
          >
            Dashboard
          </a>
          <a
            href="/student/courses"
            className="px-3 py-2 rounded hover:bg-blue-100"
          >
            Courses
          </a>
          <a
            href="/student/profile"
            className="px-3 py-2 rounded hover:bg-blue-100"
          >
            Profile
          </a>
          <a
            href="/student/settings"
            className="px-3 py-2 rounded hover:bg-blue-100"
          >
            Settings
          </a>
        </nav>
      </aside>
    </>
  );
}
