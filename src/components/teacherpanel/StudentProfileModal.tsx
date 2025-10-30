"use client";

import { X } from "lucide-react";
import { SubscriptionType } from "@/types/subscription";

interface Props {
  student: SubscriptionType;
  onClose: () => void;
}

const StudentProfileModal: React.FC<Props> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative overflow-y-auto max-h-[90vh] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 flex flex-col items-center text-center border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-100">
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {student.studentName}
          </h2>
          <p className="text-sm text-gray-500">{student.studentEmail}</p>
        </div>

        {/* Profile Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4 items-center">
            <div className="w-full text-center bg-green-50 p-3 rounded-xl">
              <p className="text-green-600 font-medium">
                Subscription: {student.status || "N/A"}
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Student Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="font-medium">{student.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{student.studentEmail}</p>
                </div>
                <div>
                  <p className="text-gray-500">Grade</p>
                  <p className="font-medium">{student.gradeName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Subject</p>
                  <p className="font-medium truncate">{student.subjectName || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileModal;
