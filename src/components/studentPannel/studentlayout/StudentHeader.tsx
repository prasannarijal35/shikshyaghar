"use client";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi"; // Importing react icon
import logo from "@/assets/logo/Sg_logo.png";

export default function StudentHeader({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <header
      className={`h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm z-10 fixed top-0 ${
        isSidebarOpen ? "left-64" : "left-0"
      } right-0 transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button className="p-2 rounded-md bg-gray-100" onClick={toggleSidebar}>
          <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
        </button>

        <span className="text-gray-700 text-lg font-semibold">Dashboard</span>
      </div>

      {/* Search Bar */}
      <div className="hidden sm:block w-full max-w-md mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-gray-100">
          <span role="img" aria-label="notification">
            🔔
          </span>
        </button>
        <Image
          src={logo}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-gray-700 hidden sm:block">sanjeev</span>
      </div>
    </header>
  );
}
