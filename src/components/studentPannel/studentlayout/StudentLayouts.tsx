"use client";

import { ReactNode, useState } from "react";
import StudentHeader from "@/components/studentPannel/studentlayout/StudentHeader";
import StudentSidebar from "@/components/studentPannel/studentlayout/StudentAside";
import StudentFooter from "@/components/studentPannel/studentlayout/StudentFooter";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StudentSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "sm:ml-64" : "ml-0"
        }`}
      >
        <StudentHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="pt-16 p-4">{children}</main>
        <StudentFooter />
      </div>
    </div>
  );
}
