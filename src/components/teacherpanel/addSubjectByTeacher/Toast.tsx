import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-blue-100 text-blue-800 border border-blue-300";
    }
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 max-w-sm transition-all duration-500 ease-in-out transform animate-slide-in ${getToastStyles()}`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
