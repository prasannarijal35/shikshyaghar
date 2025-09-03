"use client";

import { useState } from "react";
import { ClassStatus, TeacherClass } from "@/types/teacher/class";
import dummyLiveClasses from "@/data/liveClass";

export default function StudentLiveClasses() {
  const [classes] = useState<TeacherClass[]>(dummyLiveClasses);

  const computeStatus = (cls: TeacherClass): ClassStatus => {
    const start = new Date(cls.startTime);
    const end = new Date(start.getTime() + cls.duration * 60000);
    const now = new Date();
    if (now < start) return ClassStatus.Upcoming;
    if (now > end) return ClassStatus.Completed;
    return ClassStatus.Live;
  };

  if (!classes.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">No live classes available.</p>
      </div>
    );

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-primary mb-6">My Live Classes</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => {
          const status = computeStatus(cls);
          const startDate = new Date(cls.startTime);
          const dateStr = startDate.toLocaleDateString();
          const timeStr = startDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={cls.id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-lg transition relative"
            >
              <h2 className="text-lg font-bold mb-2">{cls.title}</h2>
              <p className="text-sm text-gray-600 mb-1">Grade: {cls.grade}</p>
              <p className="text-sm text-gray-600 mb-1">
                Subject: {cls.subject}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Time: {dateStr} • {timeStr}
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

              {status !== ClassStatus.Completed && cls.meetingLink && (
                <button
                  onClick={() => window.open(cls.meetingLink, "_blank")}
                  className="mt-3 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {status === ClassStatus.Live
                    ? "Join Now"
                    : "Join When Starts"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
