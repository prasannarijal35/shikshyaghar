"use client";

import { useEffect, useState } from "react";
import { SubscriptionType } from "@/types/subscription";
import useSubscriptionService from "@/services/subscriptionServices";
import StudentProfileModal from "./StudentProfileModal";

export default function MyStudentsPage() {
  const [activeStudents, setActiveStudents] = useState<SubscriptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<SubscriptionType | null>(null);

  const subscriptionService = useSubscriptionService();

  const fetchActiveStudents = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await subscriptionService.getByTeacherId();
      const allSubscriptions: SubscriptionType[] = res.subscriptions || [];
      const active = allSubscriptions.filter(
        (sub) => sub.status === "ACTIVE"
      );

      setActiveStudents(active);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch active students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveStudents();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-primary">My Students</h1>

      {loading && <p className="text-gray-500 text-center">Loading students...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && activeStudents.length === 0 && (
        <p className="text-gray-500 text-center">No active students found.</p>
      )}

      {!loading && activeStudents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {student.studentName}
              </h2>
              <p className="text-sm text-gray-500">{student.studentEmail}</p>
              <p className="text-sm text-gray-600 mt-2">
                Subject:{" "}
                <span className="font-medium">
                  {student.subjectName || "N/A"}
                </span>
              </p>
              <p className="mt-1 text-sm font-medium text-green-600">
                Active
              </p>
              <button
                onClick={() => setSelectedStudent(student)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </main>
  );
}
