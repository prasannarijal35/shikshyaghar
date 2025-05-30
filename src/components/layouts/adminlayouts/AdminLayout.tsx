"use client";
import { ReactNode, useState } from "react";
import AdminSidebar from "@/components/layouts/adminlayouts/AdminAside";
import AdminHeader from "@/components/layouts/adminlayouts/AdminHeader";
import AdminFooter from "@/components/layouts/adminlayouts/AdminFooter";

export default function Layout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "sm:ml-64" : "ml-0"
        }`}
      >
        <AdminHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="pt-16 p-4">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}
