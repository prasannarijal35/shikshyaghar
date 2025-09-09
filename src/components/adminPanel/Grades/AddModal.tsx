// components/adminPanel/Grades/AddGradeModal.tsx
"use client";

import { useState } from "react";

interface AddGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (gradeName: string) => void;
}

export default function AddGradeModal({
  isOpen,
  onClose,
  title,
  onConfirm,
}: AddGradeModalProps) {
  const [gradeName, setGradeName] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!gradeName.trim()) return;
    onConfirm(gradeName.trim());
    setGradeName("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <input
          type="text"
          value={gradeName}
          onChange={(e) => setGradeName(e.target.value)}
          placeholder="Enter grade name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
          >
            Add Grade
          </button>
        </div>
      </div>
    </div>
  );
}
