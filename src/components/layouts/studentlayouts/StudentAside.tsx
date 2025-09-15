"use client";

import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdPerson,
  MdClass,
  MdNotifications,
  MdHelp,
  MdFindReplace,
} from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "@/utils/logout";
import { SubscriptIcon } from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/student/dashboard", icon: MdDashboard },
  { name: "My Profile", href: "/student/profile", icon: MdPerson },
  { name: "Subscription", href: "/student/subscription", icon: SubscriptIcon },
  { name: "My Classes", href: "/student/class", icon: MdClass },
  { name: "Find Teachers", href: "/student/findteacher", icon: MdFindReplace },
  { name: "Notifications", href: "/notifications", icon: MdNotifications },
  { name: "Help & Support", href: "/support", icon: MdHelp },
];

export default function StudentAside() {
  const pathname = usePathname();
  const handleLogout = useLogout();

  return (
    <aside className="w-16 hover:w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out group shadow-sm">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={logo}
            alt="SG Coaching Logo"
            width={32}
            height={32}
            className="w-15 h-15 flex-shrink-0"
          />
          <span className="font-semibold text-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
            ShikshaGhar
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto hide-scrollbar">
        <ul className="space-y-2 px-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={name}>
                <Link href={href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer min-w-0 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 flex-shrink-0 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden ${
                        isActive ? "text-blue-600" : "text-gray-700"
                      }`}
                    >
                      {name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section - Logout */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-xl group hover:bg-red-50 transition-colors duration-200"
        >
          <div className="bg-red-100 text-red-600 w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0">
            <FaSignOutAlt className="w-4 h-4" />
          </div>
          <span className="text-sm text-red-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
