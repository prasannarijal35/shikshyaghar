"use client";

import { SubscriptionType } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionsGridProps {
  subscriptions: SubscriptionType[];
  onClickSubscription: (sub: SubscriptionType) => void;
  onDeleteSubscription: (sub: SubscriptionType) => void;
}

const SubscriptionsGrid: React.FC<SubscriptionsGridProps> = ({
  subscriptions,
}) => {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No subscriptions available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {subscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} subscription={sub} />
      ))}
    </div>
  );
};

export default SubscriptionsGrid;
