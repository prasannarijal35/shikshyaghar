"use client";
import React, { useState, useEffect } from "react";
import { TeacherSubjectAssignment } from "@/types/teacherSubject";
import toast from "react-hot-toast";
import TeacherSubjectService from "@/services/teacherSubjectServices";
import { X, Loader } from "lucide-react";

interface Props {
  cls: TeacherSubjectAssignment;
  onEdit: (cls: TeacherSubjectAssignment) => void;
  onDeleted?: () => void;
}

const TeacherSubjectCard: React.FC<Props> = ({ cls, onEdit, onDeleted }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [status, setStatus] = useState<"Upcoming" | "Live" | "Completed">(
    "Upcoming"
  );

  // Calculate start, end, and status
  const calculateStatus = () => {
    const [hours, minutes, seconds] = cls.startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(hours, minutes, seconds || 0);
    const end = new Date(start.getTime() + cls.duration * 60000);

    if (new Date() < start) return "Upcoming";
    if (new Date() > end) return "Completed";
    return "Live";
  };

  useEffect(() => {
    setStatus(calculateStatus());
    const interval = setInterval(() => setStatus(calculateStatus()), 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cls.startTime, cls.duration]);

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setLoadingDelete(true);
    try {
      await TeacherSubjectService.deleteAssignment(cls.id);
      toast.success("Class deleted successfully");
      onDeleted?.();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete class");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleStart = () => {
    if (!cls.meetingLink) return toast.error("No meeting link available");
    window.open(cls.meetingLink, "_blank");
  };

  const startDate = new Date();
  const [hours, minutes, seconds] = cls.startTime.split(":").map(Number);
  startDate.setHours(hours, minutes, seconds || 0);

  return (
    <>
      <article className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition space-y-3">
        <h2 className="text-lg font-semibold">{`${cls.gradeSubject.subject.name} - ${cls.gradeSubject.grade.name}`}</h2>
        <p className="text-sm text-gray-600">
          {cls.description || "No description"}
        </p>
        <p className="text-sm text-gray-600">
          {startDate.toLocaleDateString()} •{" "}
          {startDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          • {cls.duration} min
        </p>
        <p className="text-sm text-gray-600 font-medium">
          Price: Rs {cls.price ?? 0}
        </p>
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
            disabled={!cls.meetingLink}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm"
          >
            Start
          </button>

          <button
            onClick={() => onEdit(cls)}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-all shadow-sm"
          >
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={loadingDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center"
          >
            {loadingDelete ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherSubjectCard;
