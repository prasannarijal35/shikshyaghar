"use client";

import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdBarChart,
  MdGroups,
  MdVerified,
  MdEditNote,
  MdSettings,
  MdLibraryBooks,
  MdSubject,
} from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "@/utils/logout";

export const navItems = [
  { name: "Overview Stats", href: "/admin/dashboard", icon: MdBarChart },
  { name: "Student Management", href: "/admin/students", icon: MdGroups },
  { name: "Teacher Management", href: "/admin/teachers", icon: MdGroups },
  {
    name: "Teacher Verification",
    href: "/admin/teacherverification",
    icon: MdVerified,
  },
  { name: "Subject Management", href: "/admin/subjects", icon: MdSubject },
  {
    name: "Subscription Management",
    href: "/admin/subscription",
    icon: MdLibraryBooks,
  },
  { name: "Grade Management", href: "/admin/grades", icon: MdLibraryBooks },
  {
    name: "Grade-Subject Management",
    href: "/admin/gradeSubjects",
    icon: MdLibraryBooks,
  },
  {
    name: "Teacher-Subject Management",
    href: "/admin/teacherSubjects",
    icon: MdLibraryBooks,
  },
  { name: "Review Management", href: "/admin/reviews", icon: MdSettings },
  { name: "Blog Manager", href: "/admin/blogs", icon: MdEditNote },
];

export default function AdminAside() {
  const pathname = usePathname();
  const handleLogout = useLogout();

  return (
    <aside className="w-20 hover:w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out group shadow-2xl overflow-hidden">
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-center px-4 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 min-w-0 overflow-hidden"
        >
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-2xl shadow-lg">
              <Image
                src={logo}
                alt="SG Logo"
                width={32}
                height={32}
                className="w-8 h-8 flex-shrink-0"
              />
            </div>
          </div>
          <div className="hidden group-hover:block transition-all duration-300 overflow-hidden">
            <h1 className="font-bold text-xl text-white whitespace-nowrap">
              ShikshyaGhar
            </h1>
            <p className="text-xs text-purple-300 whitespace-nowrap">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <ul className="space-y-1 px-3">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={name}>
                <Link href={href}>
                  <div
                    className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden group/item ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/50"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                    )}

                    <div className="relative flex-shrink-0">
                      <Icon
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive
                            ? "text-white scale-110"
                            : "text-slate-400 group-hover/item:text-white group-hover/item:scale-110"
                        }`}
                      />
                    </div>

                    <span
                      className={`font-medium text-sm whitespace-nowrap hidden group-hover:block ${
                        isActive ? "" : ""
                      }`}
                    >
                      {name}
                    </span>

                    {/* Glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-xl blur-sm -z-10"></div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-4 px-4 py-3.5 w-full rounded-xl text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group/logout overflow-hidden"
        >
          <div className="relative flex-shrink-0">
            <FaSignOutAlt className="w-5 h-5 transition-all duration-300 group-hover/logout:scale-110" />
          </div>

          <span className="text-sm font-medium whitespace-nowrap hidden group-hover:block">
            Logout
          </span>

          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/10 rounded-xl opacity-0 group-hover/logout:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </aside>
  );
}
