"use client";

import React from "react";

interface StudentHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function StudentHeader({
  isSidebarOpen,
  toggleSidebar,
}: StudentHeaderProps) {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle sidebar"
      >
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isSidebarOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      <h1 className="text-xl font-semibold text-gray-800">Student Panel</h1>
      <div>{/* You can add user avatar or profile dropdown here */}</div>
    </header>
  );
}
