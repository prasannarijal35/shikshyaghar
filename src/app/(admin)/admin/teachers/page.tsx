import React from "react";
import UserTable from "@/components/adminPanel/students/StudentTable";

export default function TeacherManagementPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-8">Teacher Management</h1>
      <UserTable />
    </main>
  );
}
