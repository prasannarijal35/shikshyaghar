"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoNotifications } from "react-icons/io5";
import logo from "@/assets/logo/Sg_logo.png";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function StudentHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  function getCurrentDate() {
    const today = new Date();
    // Format: Month Day, Year (e.g., Sep 4, 2025)
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Close dropdown when clicked outside
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Left: Welcome message and date */}
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          Welcome, Amanda
        </h1>
        <p className="text-sm text-gray-500 hidden md:block">
          {getCurrentDate()}
        </p>
      </div>

      {/* Right: Search + Notifications + Avatar */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-64 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search"
          />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
        >
          <IoNotifications className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar with dropdown */}
        <div className="relative" ref={menuRef}>
          <Image
            src={logo}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer hover:border-blue-400 transition-colors"
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="absolute right-0 top-12 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg w-60 z-50">
              {/* Banner and Circular Image */}
              <div className="relative">
                <div className="h-16 w-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={logo}
                    alt="Profile"
                    height={60}
                    width={60}
                    className="h-15 w-15 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
              </div>

              {/* Name and Email */}
              <div className="mt-8 text-center border-b border-gray-200 px-4 pb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Mr. Prasanna Rijal
                </h3>
                <p className="text-xs text-gray-500 mt-1">admin@lamo.com</p>
              </div>

              {/* Menu Items */}
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

                <button className="w-full mt-2 flex items-center justify-center gap-2 p-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
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
