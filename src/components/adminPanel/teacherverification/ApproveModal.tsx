"use client";
import React, { useEffect, useRef } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onConfirm: () => void;
}

export default function ApproveModal({
  isOpen,
  onClose,
  description,
  onConfirm,
}: ApproveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-brightness-95" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-md bg-white rounded-lg shadow-lg"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">Are you sure?</h3>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="focus:outline-none hover:scale-110 transition-transform"
            >
              <IoMdCloseCircleOutline className="text-2xl text-gray-600 hover:text-green-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="mb-6 text-gray-700">{description}</p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
