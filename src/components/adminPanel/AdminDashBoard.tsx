"use client";

import React from "react";
import { Users, Activity, UserPlus } from "lucide-react";

export default function AdminDashBoard() {
  const stats = [
    {
      label: "Total Users",
      value: 1280,
      icon: <Users className="text-blue-600" size={24} />,
    },
    {
      label: "Active Sessions",
      value: 83,
      icon: <Activity className="text-green-600" size={24} />,
    },
    {
      label: "New Requests",
      value: 12,
      icon: <UserPlus className="text-purple-600" size={24} />,
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        📊 Overview Stats
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon }, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm hover:bg-gray-100 transition"
          >
            <div>{icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{label}</p>
              <p className="text-xl font-bold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



