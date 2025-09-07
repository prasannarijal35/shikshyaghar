"use client";

import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ViewTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: {
    fullName: string;
    email: string;
    qualification?: string;
    profilePicture?: string;
    documentUrl?: string;
    bio?: string;
    experience?: number;
  } | null;
}

export default function ViewTeacherModal({
  isOpen,
  onClose,
  teacher,
}: ViewTeacherModalProps) {
  if (!isOpen || !teacher) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-2xl font-semibold text-gray-800">
              {teacher.fullName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircleOutline size={28} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 flex flex-col items-center gap-4">
            <Image
              src={teacher.profilePicture || "/default-avatar.png"}
              alt={teacher.fullName}
              width={140}
              height={140}
              className="rounded-full object-cover border-2 border-gray-200"
            />

            <div className="w-full space-y-2">
              <p>
                <strong>Email:</strong> {teacher.email}
              </p>
              <p>
                <strong>Qualification:</strong> {teacher.qualification || "-"}
              </p>
              <p>
                <strong>Experience:</strong> {teacher.experience || 0}{" "}
                {teacher.experience === 1 ? "year" : "years"}
              </p>
              <p>
                <strong>Bio:</strong> {teacher.bio || "-"}
              </p>

              {/* Document */}
              {teacher.documentUrl ? (
                <a
                  href={teacher.documentUrl}
                  target="_blank"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Document
                </a>
              ) : (
                <p className="text-gray-500 mt-2">No document uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
