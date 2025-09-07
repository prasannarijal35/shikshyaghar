"use client";

import { SubscriptionType } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionsGridProps {
  subscriptions: SubscriptionType[];
  onClickSubscription: (id: number) => void;
}

const SubscriptionsGrid: React.FC<SubscriptionsGridProps> = ({
  subscriptions,
  onClickSubscription,
}) => {
  if (!subscriptions || subscriptions.length === 0) {
    console.log("No subscriptions to display");
    return (
      <div className="text-center text-gray-500 py-8">
        No subscriptions available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {subscriptions.map((sub) => {
        return (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onClick={() => onClickSubscription(sub.id)}
          />
        );
      })}
    </div>
  );
};

export default SubscriptionsGrid;
