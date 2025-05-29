"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import logo from "@/assets/logo/Sg_logo.png";
import { IoNotifications } from "react-icons/io5";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function StudentHeader({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
    <header
      className={`fixed top-0 right-0 left-0 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 transition-all duration-300 ${
        isSidebarOpen ? "left-64" : "left-0"
      }`}
    >
      {/* Left: Sidebar toggle + Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
        </button>

        <div className="hidden sm:block flex-grow min-w-0">
          <input
            type="search"
            placeholder="Search..."
            className="w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right: Notifications + Avatar + Dropdown */}
      <div className="flex items-center gap-4 min-w-fit relative">
        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <IoNotifications className="h-6 w-6 text-gray-700" />
        </button>

        <div className="relative" ref={menuRef}>
          <Image
            src={logo}
            alt="User Avatar"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full border border-gray-300 object-cover select-none cursor-pointer"
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 top-11 mt-2 bg-white rounded-md border-[1px] border-gray-200 w-60 z-20">
              <div className="relative">
                <div className="h-20 w-full bg-blue-100 rounded-t-md"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <Image
                    src={logo}
                    alt="logo"
                    height={100}
                    width={100}
                    quality={100}
                    className="h-20 w-20 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center border-b-[1px] border-gray-200 px-2 pb-3">
                <h1 className="text-[14px] font-medium">Mr. Prasanna Rijal</h1>
                <p className="text-[10px] font-normal text-gray-500">
                  admin@lamo.com
                </p>
              </div>

              <ul className="space-y-2">
                <li className="p-2 cursor-pointer">
                  <div className="flex gap-2">
                    <div className="bg-gray-100 rounded-md p-2 flex justify-center items-center">
                      <FaUser className="text-primary" />
                    </div>
                    <Link href={"/student/profile"} className="flex flex-col">
                      <p className="font-normal text-sm text-gray-700">
                        Profile
                      </p>
                      <span className="font-normal text-gray-500 text-[10px]">
                        View and update your profile.
                      </span>
                    </Link>
                  </div>
                </li>

                <div className="p-2">
                  <button className="flex items-center justify-center gap-2 p-2 w-full bg-primary text-white text-[14px] text-center rounded-md">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
