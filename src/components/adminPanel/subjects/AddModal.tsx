"use client";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialName?: string;
  onConfirm: (name: string) => Promise<void>;
}

export default function SubjectModal({
  isOpen,
  onClose,
  title,
  initialName = "",
  onConfirm,
}: SubjectModalProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setName(initialName);
    setErrorMessage(null);
  }, [initialName, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      await onConfirm(name.trim());
      setSuccessMessage(
        title.includes("Edit") ? "Subject updated!" : "Subject added!"
      );
      setName("");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.errors?.[0]?.msg ||
          err?.response?.data?.message ||
          "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
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
          <div className="p-6">
            <input
              type="text"
              placeholder="Enter subject name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              disabled={loading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            />

            {errorMessage && (
              <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-sm text-green-600 mb-2">{successMessage}</p>
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
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  title.includes("Edit")
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } disabled:opacity-50`}
              >
                {loading
                  ? title.includes("Edit")
                    ? "Updating..."
                    : "Adding..."
                  : title.includes("Edit")
                  ? "Save Changes"
                  : "Add Subject"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
