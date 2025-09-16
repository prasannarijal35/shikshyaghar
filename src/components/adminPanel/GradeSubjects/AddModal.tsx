"use client";

import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Subject } from "@/services/subjectServices";
import { Grade } from "@/types/grade";

interface GradeSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  grades: Grade[];
  subjects: Subject[];
  initialGradeId?: number;
  initialSubjectId?: number;
  initialPrice?: number;
  onConfirm: (gradeId: number, subjectId: number, price: number) => void;
}

export default function GradeSubjectModal({
  isOpen,
  onClose,
  title,
  grades,
  subjects,
  initialGradeId,
  initialSubjectId,
  initialPrice,
  onConfirm,
}: GradeSubjectModalProps) {
  const [gradeId, setGradeId] = useState<number | undefined>(initialGradeId);
  const [subjectId, setSubjectId] = useState<number | undefined>(
    initialSubjectId
  );
  const [price, setPrice] = useState<number | "">(
    initialPrice !== undefined ? initialPrice : ""
  );

  // Reset state when modal opens or props change
  useEffect(() => {
    setGradeId(initialGradeId);
    setSubjectId(initialSubjectId);
    setPrice(initialPrice !== undefined ? initialPrice : "");
  }, [initialGradeId, initialSubjectId, initialPrice, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!gradeId || !subjectId) {
      alert("Please select both grade and subject");
      return;
    }

    const finalPrice = price === "" ? 0 : price;

    if (finalPrice < 0) {
      alert("Price cannot be negative");
      return;
    }

    onConfirm(gradeId, subjectId, finalPrice);

    // Reset state
    setGradeId(undefined);
    setSubjectId(undefined);
    setPrice("");
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="focus:outline-none hover:scale-110 transition-transform text-gray-600 hover:text-red-600 text-2xl"
            >
              <IoMdCloseCircleOutline />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-4">
            <label className="font-medium">Grade</label>
            <select
              value={gradeId ?? ""}
              onChange={(e) => setGradeId(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <label className="font-medium">Subject</label>
            <select
              value={subjectId ?? ""}
              onChange={(e) => setSubjectId(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <label className="font-medium">Price</label>
            <input
              type="number"
              value={price}
              min={0}
              placeholder="Enter price"
              onChange={(e) =>
                setPrice(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Number(e.target.value))
                )
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-end gap-3 mt-4">
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
                {title.includes("Edit") ? "Save Changes" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
