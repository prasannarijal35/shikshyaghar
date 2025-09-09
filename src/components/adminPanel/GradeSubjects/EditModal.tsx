"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Grade } from "@/services/gradeServices";
import { Subject } from "@/services/subjectServices";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  grades: Grade[];
  subjects: Subject[];
  selectedGradeId?: number;
  selectedSubjectId?: number;
  selectedPrice?: number;
  onConfirm: (updatedGradeId: number, updatedSubjectId: number, updatedPrice: number) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  title,
  grades,
  subjects,
  selectedGradeId,
  selectedSubjectId,
  selectedPrice,
  onConfirm,
}: EditModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [gradeId, setGradeId] = useState<number | undefined>(selectedGradeId ?? undefined);
  const [subjectId, setSubjectId] = useState<number | undefined>(selectedSubjectId ?? undefined);
  const [price, setPrice] = useState<number>(selectedPrice ?? 0);

  // Sync with props
  useEffect(() => {
    setGradeId(selectedGradeId ?? undefined);
    setSubjectId(selectedSubjectId ?? undefined);
    setPrice(selectedPrice ?? 0);
  }, [selectedGradeId, selectedSubjectId, selectedPrice]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!gradeId || !subjectId) {
      alert("Please select both grade and subject");
      return;
    }
    onConfirm(gradeId, subjectId, price);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-brightness-95" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref={modalRef} className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">{title}</h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="focus:outline-none hover:scale-110 transition-transform"
            >
              <IoMdCloseCircleOutline className="text-2xl text-gray-600 hover:text-red-600" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <label className="font-medium">Grade</label>
            <select
              value={gradeId ?? ""}
              onChange={(e) => setGradeId(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
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
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <label className="font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
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
                className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
