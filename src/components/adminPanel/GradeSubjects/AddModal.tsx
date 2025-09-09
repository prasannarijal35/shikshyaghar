// src/components/adminPanel/GradeSubjects/AddGradeSubjectModal.tsx
"use client";

import { useState } from "react";
import { Grade } from "@/services/gradeServices";
import { Subject } from "@/services/subjectServices";

interface AddGradeSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  grades: Grade[];
  subjects: Subject[];
  onConfirm: (gradeId: number, subjectId: number, price: number) => void;
}

export default function AddGradeSubjectModal({
  isOpen,
  onClose,
  title,
  grades,
  subjects,
  onConfirm,
}: AddGradeSubjectModalProps) {
  const [gradeId, setGradeId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!gradeId || !subjectId) return;
    onConfirm(gradeId, subjectId, price);
    setGradeId(null);
    setSubjectId(null);
    setPrice(0);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Grade Select */}
        <select
          value={gradeId ?? ""}
          onChange={(e) => setGradeId(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-3"
        >
          <option value="">Select Grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Subject Select */}
        <select
          value={subjectId ?? ""}
          onChange={(e) => setSubjectId(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-3"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Price Input */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter price"
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
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
