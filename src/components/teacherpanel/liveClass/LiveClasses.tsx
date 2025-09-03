"use client";

import { useState } from "react";
import ScheduleClassModal from "@/components/teacherpanel/liveClass/Schedule";
// import LiveClassesCard from "@/components/teacherpanel/liveClass/LiveClasses";

// Define the card component here to avoid circular import
type LiveClassesCardProps = {
  cls: TeacherClass;
  onEdit: (cls: TeacherClass) => void;
  onDelete: (id: string) => void;
};

function LiveClassesCard({ cls, onEdit, onDelete }: LiveClassesCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{cls.subject}</h2>
        <span
          className={`px-2 py-1 rounded text-xs ${
            cls.status === "Live"
              ? "bg-green-100 text-green-700"
              : cls.status === "Upcoming"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {cls.status}
        </span>
      </div>
      <div>
        <div>
          <strong>Date:</strong> {cls.date}
        </div>
        <div>
          <strong>Time:</strong> {cls.time}
        </div>
        <div>
          <strong>Duration:</strong> {cls.duration}
        </div>
        {cls.meetingLink && (
          <div>
            <a
              href={cls.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Join Meeting
            </a>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(cls)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(cls.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

type ClassStatus = "Upcoming" | "Live" | "Completed";

type TeacherClass = {
  id: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: ClassStatus;
  meetingLink?: string;
};

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<TeacherClass[]>([
    {
      id: "1",
      subject: "Math",
      date: "2025-09-05",
      time: "10:00",
      duration: "1h",
      status: "Upcoming",
    },
    {
      id: "2",
      subject: "Science",
      date: "2025-09-06",
      time: "14:00",
      duration: "2h",
      status: "Live",
      meetingLink: "https://zoom.us/meeting/456",
    },
    {
      id: "3",
      subject: "English",
      date: "2025-09-08",
      time: "16:00",
      duration: "1h",
      status: "Completed",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<TeacherClass | null>(null);

  const handleEdit = (cls: TeacherClass) => {
    setEditingClass(cls);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const handleSubmit = (data: Omit<TeacherClass, "id" | "status">) => {
    if (editingClass) {
      setClasses(
        classes.map((cls) =>
          cls.id === editingClass.id ? { ...cls, ...data } : cls
        )
      );
      setEditingClass(null);
    } else {
      const newClass: TeacherClass = {
        id: (classes.length + 1).toString(),
        status: "Upcoming",
        ...data,
      };
      setClasses([...classes, newClass]);
    }
  };

  return (
    <div className="p-8 space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Classes</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Schedule Class
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <LiveClassesCard
            key={cls.id}
            cls={cls}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ScheduleClassModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingClass(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          editingClass
            ? {
                subject: editingClass.subject,
                date: editingClass.date,
                time: editingClass.time,
                duration: editingClass.duration,
              }
            : undefined
        }
      />
    </div>
  );
}
