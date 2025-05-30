"use client";

export default function AdminFooter() {
  return (
    <div className="text-center p-4 bg-white shadow text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
    </div>
  );
}
