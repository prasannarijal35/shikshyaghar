"use client";

import { ReactNode } from "react";
import StudentHeader from "@/components/layouts/studentlayouts/StudentHeader";
import StudentSidebar from "@/components/layouts/studentlayouts/StudentAside";
import StudentFooter from "@/components/layouts/studentlayouts/StudentFooter";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="ml-16 transition-all duration-300 flex flex-col min-h-screen">
        {/* Header */}
        <StudentHeader />

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] p-6">
          <div className="max-w-full">{children}</div>
          <StudentFooter />
        </main>
      </div>
    </div>
  );
}
