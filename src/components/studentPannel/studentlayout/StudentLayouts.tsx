"use client";

import React, { ReactNode, useState } from "react";
import StudentHeader from "@/components/studentPannel/studentlayout/StudentHeader";
import StudentSidebar from "@/components/studentPannel/studentlayout/StudentAside";
import StudentFooter from "@/components/studentPannel/studentlayout/StudentFooter";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-screen flex">
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <main className="flex-1 bg-gray-100 h-screen flex flex-col">
        <StudentHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        <StudentFooter />
      </main>
    </div>
  );
}
