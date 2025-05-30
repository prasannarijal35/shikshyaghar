"use client";
import React from "react";

const dummyStudents = [
  { id: 1, name: "Sanjeev", email: "sanjeev@example.com", status: "Active" },
  { id: 2, name: "Abhinav", email: "abhinav@example.com", status: "Blocked" },
];

export default function StudentTable() {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-6">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyStudents.map((student) => (
            <tr
              key={student.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium">{student.name}</td>
              <td className="px-6 py-4">{student.email}</td>
              <td className="px-6 py-4">{student.status}</td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
