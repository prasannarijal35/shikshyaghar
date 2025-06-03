import StudentTable from "@/components/adminpanel/TeacherTable";

export default function StudentManagementPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Student Management
      </h1>
      <StudentTable />
    </main>
  );
}
