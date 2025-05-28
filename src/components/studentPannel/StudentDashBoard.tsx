"use client";

import {
  FaBell,
  FaComments,
  FaCog,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";
import Image from "next/image";

const StudentDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2746] text-white min-h-screen p-4 space-y-4">
        <div className="flex items-center space-x-3 mb-8">
          <Image
            src="/avatar.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-sm font-semibold">John David</h2>
            <span className="text-green-400 text-xs">● Online</span>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            "Dashboard",
            "Widgets",
            "Elements",
            "Tables",
            "Apps",
            "Pricing Tables",
            "Contact",
            "Additional Pages",
            "Map",
            "Charts",
            "Settings",
          ].map((item) => (
            <div key={item} className="hover:text-yellow-400 cursor-pointer">
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4 text-gray-600 text-lg">
            <FaBell />
            <FaComments />
            <FaCog />
            <div className="flex items-center gap-2 text-sm">
              <Image
                src="/avatar.jpg"
                alt="User"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>John David</span>
            </div>
          </div>
        </header>

        {/* Top Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Welcome", value: "2500" },
            { label: "Average Time", value: "123.50" },
            { label: "Collections", value: "1,805" },
            { label: "Comments", value: "54" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white p-4 rounded-lg shadow text-center"
            >
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Social Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {
              platform: "Facebook",
              stats: ["35k Friends", "128 Feeds"],
              color: "bg-blue-700",
              icon: <FaFacebookF />,
            },
            {
              platform: "Twitter",
              stats: ["584k Followers", "978 Tweets"],
              color: "bg-blue-500",
              icon: <FaTwitter />,
            },
            {
              platform: "LinkedIn",
              stats: ["758+ Contacts", "365 Feeds"],
              color: "bg-blue-600",
              icon: <FaLinkedinIn />,
            },
            {
              platform: "Google+",
              stats: ["450 Followers", "57 Circles"],
              color: "bg-red-600",
              icon: <FaGooglePlusG />,
            },
          ].map(({ platform, stats, color, icon }) => (
            <div
              key={platform}
              className={`${color} text-white p-4 rounded-lg shadow`}
            >
              <div className="flex items-center gap-2 text-lg font-semibold">
                {icon} {platform}
              </div>
              <div className="text-sm">{stats[0]}</div>
              <div className="text-sm">{stats[1]}</div>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Extra Area Chart</h2>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
