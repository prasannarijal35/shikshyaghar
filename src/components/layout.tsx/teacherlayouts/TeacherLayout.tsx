"use client";
import { ReactNode, useState } from "react";
import { TeacherAside, TeacherFooter, TeacherHeader } from ".";
export default function Layout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <TeacherAside isOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "sm:ml-64" : "ml-0"
        }`}
      >
        <TeacherHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="pt-16 p-4">{children}</main>
        <TeacherFooter />
      </div>
    </div>
  );
}
