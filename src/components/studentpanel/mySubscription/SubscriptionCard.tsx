"use client";

import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  Mail,
  AlertCircle,
  BookOpen,
} from "lucide-react";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
  onClick: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onClick,
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

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden p-4"
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

        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              Rs.{subscription.price || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {subscription.duration || 0} months
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
      </div>
    </div>
  );
};

export default SubscriptionCard;
