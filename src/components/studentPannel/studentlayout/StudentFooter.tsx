"use client";

export default function StudentFooter() {
  return (
    <div className="text-center p-4 bg-white shadow text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Student Dashboard. All rights reserved.
    </div>
  );
}
