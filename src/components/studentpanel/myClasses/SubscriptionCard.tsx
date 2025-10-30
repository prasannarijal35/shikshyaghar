"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, User, Mail, BookOpen, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { SubscriptionType } from "@/types/subscription";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
  onClick?: () => void; // to open modal when card area clicked
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onClick,
}) => {
  const [status, setStatus] = useState<"Upcoming" | "Live" | "Completed">(
    "Upcoming"
  );

  // calculate live/upcoming/completed
  const calculateStatus = useCallback(() => {
    if (!subscription.startDate || !subscription.duration) return "Upcoming";

    const start = new Date(subscription.startDate);
    const end = new Date(
      start.getTime() + (subscription.duration || 0) * 30 * 24 * 60 * 60 * 1000
    );

    if (new Date() < start) return "Upcoming";
    if (new Date() > end) return "Completed";
    return "Live";
  }, [subscription.startDate, subscription.duration]);

  useEffect(() => {
    setStatus(calculateStatus());
    const interval = setInterval(() => setStatus(calculateStatus()), 60000);
    return () => clearInterval(interval);
  }, [calculateStatus]);

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevents modal opening
    if (!subscription.teacherSubject?.meetingLink) {
      return toast.error("No meeting link available");
    }
    window.open(subscription.teacherSubject.meetingLink, "_blank");
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const isActive = status === "Live";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden p-4 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {subscription.subjectName || "No Subject"}
            </h3>
            <p className="text-sm text-gray-500">
              {subscription.subjectId || ""}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : status === "Upcoming"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {subscription.teacherName || "No Teacher"}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Mail className="w-3 h-3" />
            {subscription.teacherEmail || "No Email"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-semibold text-base">Rs.</span>
          <span className="text-gray-900 font-bold text-lg">
            {subscription.price?.toLocaleString() || 0}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-gray-900 font-medium text-base">
            {subscription.duration || 0} month
            {subscription.duration && subscription.duration > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          {formatDate(subscription.startDate)} -{" "}
          {formatDate(subscription.endDate)}
        </span>
      </div>

      <div className="flex justify-end gap-3 border-t pt-3 mt-3">
        <button
          onClick={(e) => e.stopPropagation()} // disable "View" if active
          disabled={isActive}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            isActive
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          View
        </button>

        {isActive && (
          <button
            onClick={handleStart}
            className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Loader className="w-4 h-4 animate-spin" />
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
