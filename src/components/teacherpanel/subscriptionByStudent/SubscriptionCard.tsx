"use client";

import { useState } from "react";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import {
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  Edit3,
  X,
  Save,
  DollarSign,
  User,
  Mail,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useSubscriptionService from "@/services/subscriptionServices";

interface SubscriptionCardProps {
  subscription: SubscriptionType;
  onUpdated?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
}) => {
  const { updateByTeacher } = useSubscriptionService();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    duration: subscription.duration,
    status: subscription.status,
    endDate: subscription.endDate,
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate: string) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case SubscriptionStatus.EXPIRED:
        return "bg-rose-50 text-rose-700 border-rose-200";
      case SubscriptionStatus.PENDING:
        return "bg-amber-50 text-amber-700 border-amber-200";
      case SubscriptionStatus.FAILED:
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const handleUpdate = async () => {
    if (!editedData.duration || !editedData.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await updateByTeacher(subscription.id, editedData);
      toast.success("Subscription updated successfully");
      setIsEditing(false);

      // Refresh page after update
      window.location.reload();

      // If using parent refresh callback instead of full reload:
      // onUpdated?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isExpiringSoon =
    subscription.status === SubscriptionStatus.ACTIVE &&
    daysRemaining <= 30 &&
    daysRemaining > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 relative">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200"
        >
          <Edit3 className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/30">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              {subscription.subjectName || "No Subject"}
            </h3>
            <p className="text-sm text-blue-100 font-medium">
              {subscription.subjectId}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(
              subscription.status
            )}`}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            {subscription.status}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-5">
        {/* Teacher Info */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">
                {subscription.teacherName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-12">
            <Mail className="w-4 h-4 text-slate-400" />
            <p className="text-sm text-slate-600">
              {subscription.teacherEmail}
            </p>
          </div>
        </div>

        {/* Price & Duration Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Price
              </span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">
              Rs. {subscription.price?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                Duration
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {subscription.duration || 0}{" "}
              <span className="text-base font-medium">
                month
                {subscription.duration && subscription.duration > 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
          <Calendar className="w-5 h-5 text-slate-400" />
          <div className="flex-1">
            <p className="text-xs text-slate-500 font-medium mb-0.5">
              Subscription Period
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {formatDate(subscription.startDate)} →{" "}
              {formatDate(subscription.endDate)}
            </p>
          </div>
        </div>

        {/* Expiring Warning */}
        {isExpiringSoon && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">
                Expiring Soon
              </p>
              <p className="text-sm text-amber-700">
                Only {daysRemaining} day{daysRemaining > 1 ? "s" : ""} remaining
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Edit Subscription
              </h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Duration (months)
                </label>
                <input
                  type="number"
                  min={1}
                  value={editedData.duration || ""}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      duration: Number(e.target.value),
                    })
                  }
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={
                    editedData.endDate ? editedData.endDate.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setEditedData({ ...editedData, endDate: e.target.value })
                  }
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={editedData.status}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      status: e.target.value as SubscriptionStatus,
                    })
                  }
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {Object.values(SubscriptionStatus).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-5 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
