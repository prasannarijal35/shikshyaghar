"use client";

import { ReactNode } from "react";
import {
  AdminFooter,
  AdminHeader,
  AdminSidebar,
} from "@/components/layouts/adminlayouts";
import RequireAuthProvider from "@/providers/ReqAuthProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RequireAuthProvider role="admin">
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="ml-20 transition-all duration-300 flex flex-col min-h-screen">
          {/* Header */}
          <AdminHeader />

          {/* Main Content */}
          <main className="min-h-[calc(100vh-4rem)] p-6">
            <div className="max-w-full">{children}</div>
            <AdminFooter />
          </main>
        </div>
      </div>
    </RequireAuthProvider>
  );
}
