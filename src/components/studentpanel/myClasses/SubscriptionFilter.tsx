"use client";

import { SubscriptionStatus } from "@/types/subscription";

interface SubscriptionFilterProps {
  filterStatus: SubscriptionStatus | "ALL";
  setFilterStatus: (status: SubscriptionStatus | "ALL") => void;
}

const SubscriptionFilter: React.FC<SubscriptionFilterProps> = ({
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {["ALL", ...Object.values(SubscriptionStatus)].map((status) => (
        <button
          key={status}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            filterStatus === status
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => setFilterStatus(status as SubscriptionStatus | "ALL")}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default SubscriptionFilter;
