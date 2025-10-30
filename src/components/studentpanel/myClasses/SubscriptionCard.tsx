"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  AlertCircle,
  BookOpen,
  Loader,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
  onEdit?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
}) => {
  const [status, setStatus] = useState<"Upcoming" | "Live" | "Completed">(
    "Upcoming"
  );

  /** 📅 Calculate session status from start time and duration */
  const calculateStatus = () => {
    if (!subscription.price || !subscription.duration) return "Upcoming";

    const [hours, minutes, seconds] = subscription.startDate
      .split(":")
      .map(Number);
    const start = new Date();
    start.setHours(hours, minutes, seconds || 0);
    const end = new Date(start.getTime() + subscription.duration * 60000);

    if (new Date() < start) return "Upcoming";
    if (new Date() > end) return "Completed";
    return "Live";
  };

  useEffect(() => {
    setStatus(calculateStatus());
    const interval = setInterval(() => setStatus(calculateStatus()), 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription.startDate, subscription.duration]);

  /** 🎬 Handle Start Click */
  const handleStart = () => {
    if (!subscription.teacherSubject?.meetingLink)
      return toast.error("No meeting link available");
    window.open(subscription.teacherSubject?.meetingLink, "_blank");
  };

  /** 🧮 Utilities */
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isExpiringSoon =
    subscription.status === SubscriptionStatus.ACTIVE &&
    daysRemaining <= 30 &&
    daysRemaining > 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden p-4">
      {/* Header */}
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
            status === "Live"
              ? "bg-green-100 text-green-700"
              : status === "Upcoming"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Teacher Info */}
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

      {/* Details */}
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

      {isExpiringSoon && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 flex items-center gap-2 text-sm text-yellow-800">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          Expires in {daysRemaining} days
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-3 mt-3">
        <button
          onClick={handleStart}
          disabled={!subscription.teacherSubject?.meetingLink}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {status === "Live" ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : null}
          Start
        </button>

        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionCard;
