"use client";

import { ReactNode } from "react";
import StudentHeader from "@/components/layouts/studentlayouts/StudentHeader";
import StudentSidebar from "@/components/layouts/studentlayouts/StudentAside";
import StudentFooter from "@/components/layouts/studentlayouts/StudentFooter";
import Chatbot from "@/components/common/Chatbot";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="ml-20 transition-all duration-300 flex flex-col min-h-screen">
        {/* Header */}
        <StudentHeader />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6 bg-white">
            <div className="max-w-full">{children}</div>
          </main>

          <StudentFooter />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot userRole="student" />
    </div>
  );
}
