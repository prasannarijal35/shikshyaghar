"use client";

import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ViewTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: {
    fullName: string;
    email: string;
    phone?: string;
    gender?: string;
    birthYear?: number;
    qualification?: string;
    profilePicture?: string;
    documentUrl?: string;
    bio?: string;
    experience?: number;
    availability?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
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
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh] border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800">
              {teacher.fullName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircleOutline size={30} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <Image
                src={teacher.profilePicture || "/default-avatar.png"}
                alt={teacher.fullName}
                width={160}
                height={160}
                className="rounded-full object-cover border-4 border-gray-300 shadow-md"
              />
            </div>

            {/* Info Table */}
            <div className="grid grid-cols-2 gap-8 text-gray-700">
              {/* Left Column */}
              <div className="space-y-4 border-r border-gray-200 pr-6">
                <InfoRow label="Email" value={teacher.email} />
                <InfoRow label="Phone" value={teacher.phone} />
                <InfoRow label="Gender" value={teacher.gender} />
                <InfoRow
                  label="Birth Year"
                  value={teacher.birthYear?.toString()}
                />
                <InfoRow label="Qualification" value={teacher.qualification} />
                <InfoRow
                  label="Experience"
                  value={
                    teacher.experience
                      ? `${teacher.experience} ${
                          teacher.experience === 1 ? "year" : "years"
                        }`
                      : "-"
                  }
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4 pl-6">
                <InfoRow label="Bio" value={teacher.bio} />
                <InfoRow label="Availability" value={teacher.availability} />
                <InfoRow label="Status" value={teacher.status} />
                <InfoRow label="Created At" value={teacher.createdAt} />
                <InfoRow label="Updated At" value={teacher.updatedAt} />
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-semibold text-gray-800">Document</span>
                  {teacher.documentUrl ? (
                    <a
                      href={teacher.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Document
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Small reusable row component */
function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold text-gray-800">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}
