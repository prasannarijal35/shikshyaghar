"use client";

import { SubscriptionType } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionsGridProps {
  subscriptions: SubscriptionType[];
}

const SubscriptionsGrid: React.FC<SubscriptionsGridProps> = ({
  subscriptions,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {subscriptions.map((sub) => (
        <SubscriptionCard key={sub.id} subscription={sub} />
      ))}
    </div>
  );
};

export default SubscriptionsGrid;
