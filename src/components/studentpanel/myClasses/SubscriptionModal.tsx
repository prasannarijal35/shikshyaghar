import { X } from "lucide-react";
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
      </div>
    </div>
  );
};

export default SubscriptionModal;
