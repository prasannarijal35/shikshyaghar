"use client";

import { IoMdCloseCircleOutline } from "react-icons/io";

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    gender?: string;
    birthYear?: number;
    createdAt?: string;
    updatedAt?: string;
  } | null;
}

export default function ViewStudentModal({
  isOpen,
  onClose,
  student,
}: ViewStudentModalProps) {
  if (!isOpen || !student) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[80vh] border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
            <h3 className="text-2xl font-bold text-gray-800">
              {student.fullName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircleOutline size={28} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 text-gray-700">
            <InfoRow label="Email" value={student.email} />
            <InfoRow label="Phone" value={student.phone} />
            <InfoRow label="Gender" value={student.gender} />
            <InfoRow label="Birth Year" value={student.birthYear?.toString()} />
            <InfoRow label="Created At" value={student.createdAt} />
            <InfoRow label="Updated At" value={student.updatedAt} />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold text-gray-800">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}
