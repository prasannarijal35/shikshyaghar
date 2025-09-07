"use client";

import { IoMdCloseCircleOutline } from "react-icons/io";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  teacherName?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  teacherName,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Confirm Delete
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircleOutline size={26} />
            </button>
          </div>

          {/* Body */}
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {teacherName ?? "this teacher"}
            </span>
            ? This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
