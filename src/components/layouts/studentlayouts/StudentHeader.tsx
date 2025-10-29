"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { getUser, clearStorage } from "@/utils/localStorage";
import logo from "@/assets/logo/Sg_logo.png";
import { useRouter } from "next/navigation";
import { StudentDetails } from "@/types/students";

export default function StudentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [studentUser, setStudentUser] = useState<StudentDetails | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Safe profile picture getter
  const getProfilePicture = () => {
    const path = studentUser?.student?.profilePicture;
    if (!path || path.trim() === "") return logo; // fallback to local logo
    if (path.startsWith("http")) return path; // already full URL
    return `${process.env.NEXT_PUBLIC_API_URL}/${path}`; // prepend API URL
  };

  useEffect(() => {
    const u = getUser() as StudentDetails | null;
    if (u) setStudentUser(u);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    clearStorage();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          Welcome, {studentUser?.fullName ?? "Student"}
        </h1>
        <p className="text-sm text-gray-500 hidden md:block">
          {getCurrentDate()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-64 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
        >
          <IoNotifications className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative" ref={menuRef}>
          <Image
            src={getProfilePicture()}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer hover:border-blue-400 transition-colors"
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="absolute right-0 top-12 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg w-60 z-50">
              <div className="relative">
                <div className="h-16 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={getProfilePicture()}
                    alt="Profile"
                    height={60}
                    width={60}
                    className="h-15 w-15 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center border-b border-gray-200 px-4 pb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  {studentUser?.fullName ?? "Unknown Student"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {studentUser?.email ?? "email@unknown.com"}
                </p>
              </div>

              <div className="p-2">
                <Link
                  href="/student/profile"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="bg-gray-100 rounded-lg p-2">
                    <FaUser className="text-blue-600 w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700">Profile</p>
                    <p className="text-xs text-gray-500">
                      View and update your profile
                    </p>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
