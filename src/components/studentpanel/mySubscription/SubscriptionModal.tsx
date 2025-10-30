"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import paymentService from "@/services/paymentServices";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
// import { useAuth } from "@/context/AuthContext"; // if you have user context

interface SubscriptionModalProps {
  subscription: SubscriptionType | null;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  subscription,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  // const { user } = useAuth(); // optional if using context

  if (!subscription) return null;

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "bg-green-100 text-green-800";
      case SubscriptionStatus.EXPIRED:
        return "bg-red-100 text-red-800";
      case SubscriptionStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case SubscriptionStatus.FAILED:
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 🧾 Payment handler
 const handlePayment = async () => {
  if (!subscription) return;
  setLoading(true);
  try {
    const payload = {
      userId: 1, // replace with actual logged-in user ID
      subscriptionId: subscription.id,
      amount: subscription.price ?? 0,
    };

    const res = await paymentService.createSubscriptionPayment(payload);

    toast.success("Redirecting to Khalti...");

    // ✅ extract the correct payment URL from your backend response
    const redirectUrl = res?.data?.paymentUrl?.payment_url;

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      toast.error("Payment URL not found in response!");
      console.error("Unexpected response:", res);
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err?.message || "Payment failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {subscription.subjectName}
          </h2>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              subscription.status
            )}`}
          >
            {subscription.status}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Teacher</p>
            <p>{subscription.teacherName}</p>
            <p className="text-sm text-gray-500">{subscription.teacherEmail}</p>
          </div>

          <div>
            <p className="font-semibold">Grade</p>
            <p>{subscription.gradeName}</p>
          </div>

          <div>
            <p className="font-semibold">Duration</p>
            <p>{subscription.duration} months</p>
          </div>

          <div>
            <p className="font-semibold">Price</p>
            <p>Rs.{subscription.price}</p>
          </div>

          <div>
            <p className="font-semibold">Start Date</p>
            <p>{new Date(subscription.startDate).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold">End Date</p>
            <p>{new Date(subscription.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Footer / Payment */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`px-6 py-2 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
