"use client";

import React, { useState } from "react";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import toast from "react-hot-toast";
import teacherSubjectService from "@/services/teacherSubjectServices";

interface Props {
  cls: TeacherSubjectAssignment;
  onEdit: (cls: TeacherSubjectAssignment) => void;
  onDeleted?: () => void;
}

const TeacherSubjectCard: React.FC<Props> = ({ cls, onEdit, onDeleted }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const status = (() => {
    const start = new Date(cls.startTime);
    const end = new Date(start.getTime() + cls.duration * 60000);
    const now = new Date();
    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Live";
  })();

  const startDate = new Date(cls.startTime);
  const dateStr = startDate.toLocaleDateString();
  const timeStr = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    setLoadingDelete(true);
    try {
      await teacherSubjectService.deleteAssignment(cls.id);
      toast.success("Class deleted successfully");
      onDeleted?.();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete class");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleStart = () => {
    if (cls.meetinglink) window.open(cls.meetinglink, "_blank");
    else toast.error("No meeting link available");
  };

  return (
    <article className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition space-y-3">
      <h2 className="text-lg font-semibold">{`${cls.gradeSubject.subject.name} - ${cls.gradeSubject.grade.name}`}</h2>
      <p className="text-sm text-gray-600">
        {cls.description || "No description"}
      </p>
      <p className="text-sm text-gray-600">
        {dateStr} • {timeStr} • {cls.duration} min
      </p>
      <p className="text-sm text-gray-600 font-medium">Price: Rs {cls.price}</p>
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
          status === "Live"
            ? "bg-green-100 text-green-700"
            : status === "Upcoming"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </span>
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleStart}
          disabled={!cls.meetinglink}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={() => onEdit(cls)}
          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loadingDelete}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loadingDelete ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default TeacherSubjectCard;
