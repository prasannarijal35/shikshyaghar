"use client";

import React from "react";
import { SubscriptionType } from "@/types/subscription";
import SubscriptionCard from "./SubscriptionCard";

interface SubscriptionsGridProps {
  subscriptions: SubscriptionType[];
  onClickSubscription: (sub: SubscriptionType) => void;
  onDeleteSubscription: (sub: SubscriptionType) => void;
}

const SubscriptionsGrid: React.FC<SubscriptionsGridProps> = ({
  subscriptions,
  onClickSubscription,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subscriptions.map((sub) => (
        <div key={sub.id} onClick={() => onClickSubscription(sub)}>
          <SubscriptionCard subscription={sub} />
        </div>
      ))}
    </div>
  );
};

export default SubscriptionsGrid;
