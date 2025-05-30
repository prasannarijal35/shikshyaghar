"use client";

import React from "react";

const requests = [
  {
    id: 1,
    student: "Rahul Sharma",
    type: "Join Request",
    message: "I'd like to join your Physics class.",
    date: "2025-05-28",
    status: "Pending",
  },
  {
    id: 2,
    student: "Priya Karki",
    type: "Reschedule",
    message: "Can we move my tutoring session to Friday?",
    date: "2025-05-27",
    status: "Approved",
  },
  {
    id: 3,
    student: "Ankit Thapa",
    type: "Feedback",
    message: "Please provide feedback on my last assignment.",
    date: "2025-05-26",
    status: "Rejected",
  },
];

export default function RequestsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4">Student</th>
              <th className="p-4">Type</th>
              <th className="p-4">Message</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-4">{req.student}</td>
                <td className="p-4">{req.type}</td>
                <td className="p-4">{req.message}</td>
                <td className="p-4">{req.date}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : req.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2 justify-center">
                  <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-cyan-600 transition">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
