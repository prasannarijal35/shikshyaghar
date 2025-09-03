"use client";

import { ClassStatus, TeacherClass } from "@/types/teacher/class";

type Props = {
  cls: TeacherClass;
  onEdit: (cls: TeacherClass) => void;
  onDelete: (id: number) => void;
};

export default function LiveClassCard({ cls, onEdit, onDelete }: Props) {
  // Compute status dynamically based on startTime and duration
  const computeStatus = (): ClassStatus => {
    const start = new Date(cls.startTime);
    const end = new Date(start.getTime() + cls.duration * 60000); // duration in minutes
    const now = new Date();

    if (now < start) return ClassStatus.Upcoming;
    if (now > end) return ClassStatus.Completed;
    return ClassStatus.Live;
  };

  const status = computeStatus();

  // Format date and time for display
  const startDate = new Date(cls.startTime);
  const dateStr = startDate.toLocaleDateString();
  const timeStr = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition space-y-3">
      <h2 className="text-lg font-semibold">{cls.title}</h2>
      <p className="text-sm text-gray-600">
        {dateStr} • {timeStr} • {cls.duration} min
      </p>
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
          status === ClassStatus.Live
            ? "bg-green-100 text-green-700"
            : status === ClassStatus.Upcoming
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </span>

      <div className="flex gap-2 pt-2">
        <button
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          onClick={() =>
            cls.meetingLink && window.open(cls.meetingLink, "_blank")
          }
          disabled={!cls.meetingLink}
        >
          Start
        </button>
        <button
          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
          onClick={() => onEdit(cls)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          onClick={() => onDelete(cls.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
