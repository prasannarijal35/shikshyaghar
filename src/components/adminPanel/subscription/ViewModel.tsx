// ViewSubscriptionModal.tsx
import React from "react";
import { SubscriptionType } from "@/types/subscription";

export interface ViewSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: SubscriptionType | null;
}

const ViewSubscriptionModal: React.FC<ViewSubscriptionModalProps> = ({
  isOpen,
  onClose,
  subscription,
}) => {
  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">View Subscription</h2>
        <p>Student: {subscription.studentName}</p>
        <p>Teacher: {subscription.teacherName}</p>
        <p>Subject: {subscription.subjectName}</p>
        <p>Status: {subscription.status}</p>
        <p>Start Date: {subscription.startDate}</p>
        <p>End Date: {subscription.endDate}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewSubscriptionModal;
