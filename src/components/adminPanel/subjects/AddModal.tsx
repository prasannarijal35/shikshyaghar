// src/components/adminPanel/subjects/AddSubjectModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (name: string) => Promise<void>;
}

export default function AddSubjectModal({
  isOpen,
  onClose,
  title,
  onConfirm,
}: AddSubjectModalProps) {
  const [subjectName, setSubjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap & Escape key
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();

        if (e.key === "Tab" && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<
            HTMLButtonElement | HTMLInputElement
          >("button, input, [tabindex]:not([tabindex='-1'])");

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            (last as HTMLElement).focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            (first as HTMLElement).focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "auto";
      };
    } else {
      lastFocusedElement.current?.focus();
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!subjectName.trim()) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      await onConfirm(subjectName.trim());
      setSuccessMessage("Subject added successfully!");
      setSubjectName("");

      // Auto-close after brief delay
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(
        err?.errors?.[0]?.msg ||
          err?.message ||
          "An unexpected error occurred while adding the subject."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-brightness-95" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-subject-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          ref={modalRef}
          className="relative w-full max-w-md bg-white rounded-xl shadow-lg"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 id="add-subject-title" className="text-xl font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="focus:outline-none hover:scale-110 transition-transform"
            >
              <IoMdCloseCircleOutline className="text-2xl text-gray-600 hover:text-red-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              disabled={loading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            />

            {errorMessage && (
              <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="text-sm text-green-600 mb-3">{successMessage}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
