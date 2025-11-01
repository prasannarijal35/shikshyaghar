"use client";

import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdAssignment,
  MdClass,
  MdDashboard,
  MdGroup,
  MdPerson,
} from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "@/utils/logout";
import { MessageCircle } from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/teacher/dashboard", icon: MdDashboard },
  { name: "My Profile", href: "/teacher/profile", icon: MdPerson },
  { name: "My Classes", href: "/teacher/teacherSubject", icon: MdClass },
  { name: "Subscribers", href: "/teacher/subscriber", icon: MdAssignment },
  { name: "Students", href: "/teacher/students", icon: MdGroup },
  { name: "Post Reviews", href: "/teacher/review", icon: MdGroup },
  { name: "Community", href: "/teacher/community", icon: MessageCircle },
];

export default function AdminAside() {
  const pathname = usePathname();
  const handleLogout = useLogout();

  return (
    <aside className="w-16 hover:w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200/60 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out group shadow-xl hover:shadow-2xl">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200/60 bg-gradient-to-r from-gray-50/80 to-white/80 group">
        <Link href="/" className="flex items-center gap-3 min-w-0 group">
          <Image
            src={logo}
            alt="SG Coaching Logo"
            width={32}
            height={32}
            className="w-8 h-8 flex-shrink-0 rounded-lg shadow-sm"
          />

          <span className="font-bold text-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
            ShikshyaGhar
          </span>
        </Link>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto hide-scrollbar bg-gradient-to-b from-transparent to-gray-50/30">
        <ul className="space-y-2 px-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={name}>
                <Link href={href}>
                  <div
                    className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 cursor-pointer min-w-0 group/item overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-600 shadow-lg border border-blue-200/60 hover:shadow-xl"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/60 hover:text-gray-900 hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/10 rounded-xl"></div>
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full shadow-sm"></div>
                    )}

                    <div
                      className={`relative p-1 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-blue-500/10 group-hover/item:bg-blue-500/20"
                          : "group-hover/item:bg-gray-200/60"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-500 group-hover/item:text-gray-700"
                        }`}
                      />
                    </div>

                    <span
                      className={`font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {name}
                    </span>

                    <div
                      className={`absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/5 to-blue-600/10"
                          : "bg-gradient-to-r from-gray-500/5 to-gray-600/10"
                      }`}
                    ></div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200/60 mt-auto bg-gradient-to-r from-gray-50/60 to-white/80">
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-3 px-3 py-3 w-full rounded-xl group/logout hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/80 transition-all duration-300 hover:shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/10 rounded-xl opacity-0 group-hover/logout:opacity-100 transition-opacity duration-300"></div>

          <div className="relative bg-gradient-to-br from-red-100 to-red-200/80 text-red-600 w-8 h-8 flex items-center justify-center rounded-xl flex-shrink-0 shadow-sm group-hover/logout:shadow-md group-hover/logout:scale-110 transition-all duration-300">
            <FaSignOutAlt className="w-4 h-4" />
          </div>

          <span className="relative text-sm text-red-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap overflow-hidden">
            Logout
          </span>

          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl opacity-0 group-hover/logout:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </button>
      </div>
    </aside>
  );
}
