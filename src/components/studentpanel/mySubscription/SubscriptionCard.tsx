"use client";

import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import {
  Calendar,
  Clock,
  User,
  Mail,
  AlertCircle,
  BookOpen,
} from "lucide-react";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
  onView?: () => void;
  onDelete?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onView,
  onDelete,
}) => {
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

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "bg-green-100 text-green-800 border-green-200";
      case SubscriptionStatus.EXPIRED:
        return "bg-red-100 text-red-800 border-red-200";
      case SubscriptionStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case SubscriptionStatus.FAILED:
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isExpiringSoon =
    subscription.status === SubscriptionStatus.ACTIVE &&
    daysRemaining <= 30 &&
    daysRemaining > 0;

  const isActive = subscription.status === SubscriptionStatus.ACTIVE;

  return (
    <div className="cursor-pointer bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden p-4">
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
            <p className="text-sm text-gray-500">{subscription.subjectId}</p>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            subscription.status
          )}`}
        >
          {subscription.status}
        </div>
      </div>

      {/* Teacher info */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {subscription.teacherName || "No Teacher"}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Mail className="w-3 h-3" />{" "}
              {subscription.teacherEmail || "No Email"}
            </div>
          </div>
        </div>

        {/* Price + Duration */}
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

        {/* Dates */}
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {formatDate(subscription.startDate)} -{" "}
            {formatDate(subscription.endDate)}
          </span>
        </div>

        {/* Expiring soon */}
        {isExpiringSoon && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 flex items-center gap-2 text-sm text-yellow-800">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            Expires in {daysRemaining} days
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 border-t pt-3 mt-2">
        {/* Disable view if ACTIVE */}
        <button
          onClick={!isActive ? onView : undefined}
          disabled={isActive}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            isActive
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          View
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
