"use client";

import React, { useState, useEffect } from "react";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import useSubscriptionService from "@/services/subscriptionServices";
import { X, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionType | null;
  onSave: () => void; // Refresh parent list after save
}

const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  isOpen,
  onClose,
  subscription,
  onSave,
}) => {
  const subscriptionService = useSubscriptionService();

  // State for editable fields
  const [editedData, setEditedData] = useState<Partial<SubscriptionType>>({
    duration: subscription?.duration,
    status: subscription?.status,
    endDate: subscription?.endDate,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subscription) {
      setEditedData({
        duration: subscription.duration,
        status: subscription.status,
        endDate: subscription.endDate,
      });
    }
  }, [subscription]);

  if (!isOpen || !subscription) return null;

  const handleSave = async () => {
    // Validate required fields
    if (!editedData.duration || !editedData.status) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      // Only send allowed fields (never send teacherSubjectId)
      const payload: Partial<SubscriptionType> = {
        duration: editedData.duration,
        status: editedData.status,
      };

      await subscriptionService.updateByAdmin(subscription.id, payload);
      toast.success("Subscription updated successfully");
      onSave(); // Refresh parent list
      onClose();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Subscription</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-2">Student: {subscription.studentName}</p>
        <p className="mb-4">Teacher: {subscription.teacherName}</p>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Duration (months)
          </label>
          <input
            type="number"
            min={1}
            value={editedData.duration || ""}
            onChange={(e) =>
              setEditedData({ ...editedData, duration: Number(e.target.value) })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={editedData.status}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                status: e.target.value as SubscriptionStatus,
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            {Object.values(SubscriptionStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;
