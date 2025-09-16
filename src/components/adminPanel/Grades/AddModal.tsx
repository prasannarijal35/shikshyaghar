"use client";

import { useState, useEffect } from "react";

interface GradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialName?: string;
  onConfirm: (name: string) => void;
}

export default function GradeModal({
  isOpen,
  onClose,
  title,
  initialName = "",
  onConfirm,
}: GradeModalProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name.trim()) return;
    onConfirm(name.trim());
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter grade name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  title.includes("Edit")
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {title.includes("Edit") ? "Save Changes" : "Add Grade"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
