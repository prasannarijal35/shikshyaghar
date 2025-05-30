"use client";
import Image from "next/image";
import logo from "@/assets/logo/Sg_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdPerson,
  MdClass,
  MdAssignment,
  MdForum,
  MdEvent,
  MdNotifications,
  MdHelp,
} from "react-icons/md";

export const navItems = [
  { name: "Dashboard", href: "/student/dashboard", icon: MdDashboard },
  { name: "My Profile", href: "/student/profile", icon: MdPerson },
  { name: "My Courses", href: "/student/courses", icon: MdClass },
  { name: "Assignments", href: "/student/assignments", icon: MdAssignment },
  { name: "Discussion Forum", href: "/forum", icon: MdForum },
  { name: "Live Classes", href: "/live-classes", icon: MdEvent },
  { name: "Notifications", href: "/notifications", icon: MdNotifications },
  { name: "Help & Support", href: "/support", icon: MdHelp },
];

export default function Aside({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={`w-64 h-screen bg-white shadow-md fixed top-0 left-0 z-20 flex flex-col transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center px-6">
        <Image
          src={logo}
          alt="SG Coaching Logo"
          width={150}
          height={40}
          priority
          className="h-14 w-14"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 mt-4">
          {navItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link href={href}>
                <div
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer
    ${
      pathname === href
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-cyan-100 hover:text-primary"
    }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      pathname === href ? "text-white" : "text-primary"
                    }`}
                  />
                  <span className="font-medium">{name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
