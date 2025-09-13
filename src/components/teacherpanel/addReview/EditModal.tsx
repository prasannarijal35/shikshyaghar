"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentReview: string;
  onConfirm: (updatedReview: string) => void;
}

export default function EditReviewModal({
  isOpen,
  onClose,
  title,
  currentReview,
  onConfirm,
}: EditReviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [reviewText, setReviewText] = useState(currentReview);

  useEffect(() => {
    setReviewText(currentReview);
  }, [currentReview]);

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
    const trimmed = reviewText.trim();
    if (!trimmed) {
      toast.error("Review cannot be empty");
      return;
    }
    onConfirm(trimmed);
  };

  const handleCancel = () => {
    setReviewText(currentReview);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-brightness-95" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div ref={modalRef} className="relative w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-bold">{title}</h3>
            <button
              onClick={handleCancel}
              aria-label="Close modal"
              className="focus:outline-none hover:scale-110 transition-transform"
            >
              <IoMdCloseCircleOutline className="text-2xl text-gray-600 hover:text-red-600" />
            </button>
          </div>

          <div className="p-6">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-none h-24"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
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
