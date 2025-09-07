import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
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
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${getToastStyles()} max-w-sm animate-bounce`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
