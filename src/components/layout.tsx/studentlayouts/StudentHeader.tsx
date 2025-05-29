"use client";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import logo from "@/assets/logo/Sg_logo.png";
import { IoNotifications } from "react-icons/io5";

export default function StudentHeader({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <header
      className={`fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 transition-all duration-300 ${
        isSidebarOpen ? "left-64" : "left-0"
      }`}
    >
      {/* Left: Sidebar toggle + Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
        </button>

        {/* Search Input */}
        <div className="hidden sm:block flex-grow min-w-0">
          <input
            type="search"
            placeholder="Search..."
            className="w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right: Notifications + Avatar + Username */}
      <div className="flex items-center gap-4 min-w-fit">
        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 "
        >
          <IoNotifications className="h-6 w-6 text-gray-700" />
        </button>

        <Image
          src={logo}
          alt="User Avatar"
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover select-none"
        />
      </div>
    </header>
  );
}
