"use client";

import { useState, useEffect } from "react";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (reviewText: string) => void;
}

export default function AddReviewModal({
  isOpen,
  onClose,
  title,
  onConfirm,
}: AddReviewModalProps) {
  const [reviewText, setReviewText] = useState("");

  // Reset input when modal opens/closes
  useEffect(() => {
    if (isOpen) setReviewText("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!reviewText.trim()) return;
    onConfirm(reviewText.trim());
    setReviewText("");
  };

  const handleCancel = () => {
    setReviewText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter review"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-none h-24"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
          >
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
}
