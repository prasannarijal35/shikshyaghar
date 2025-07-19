import TeacherVerificationTable from "@/components/adminPanel/teacherverification/TeacherVerificationTable";
import React from "react";

export default function TeacherVerificationPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Teacher Verification
      </h1>
      <TeacherVerificationTable />
    </main>
  );
}
