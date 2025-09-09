"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentName: string;
  onConfirm: (updatedName: string) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  title,
  currentName,
  onConfirm,
}: EditModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName); // Reset name when modal opens with a new subject
  }, [currentName]);

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
    if (!name.trim()) return;
    onConfirm(name.trim());
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-brightness-95" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-lg bg-white rounded-lg shadow-lg"
        >
          {/* Header */}
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

          {/* Body */}
          <div className="p-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
