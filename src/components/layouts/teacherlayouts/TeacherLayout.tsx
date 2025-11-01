"use client";

import { ReactNode } from "react";
import {
  TeacherAside,
  TeacherFooter,
  TeacherHeader,
} from "@/components/layouts/teacherlayouts";
import Chatbot from "@/components/common/Chatbot";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <TeacherAside />

      {/* Main Content Area */}
      <div className="ml-20 transition-all duration-300 flex flex-col min-h-screen">
        {/* Header */}
        <TeacherHeader />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6 bg-white">
            <div className="max-w-full">{children}</div>
          </main>

          <TeacherFooter />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot userRole="teacher" />
    </div>
  );
}
