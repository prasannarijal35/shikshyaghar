"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, BookOpen } from "lucide-react";
import StudentAttendance from "@/components/studentpanel/attendance/StudentAttendance";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import useSubscriptionServices from "@/services/subscriptionServices";

export default function StudentAttendancePage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType | null>(null);
  const [loading, setLoading] = useState(true);

  const subscriptionService = useSubscriptionServices();

  useEffect(() => {
    fetchSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getByStudentId();
      const activeSubscriptions = data.filter(
        (sub: SubscriptionType) => sub.status === SubscriptionStatus.ACTIVE
      );
      setSubscriptions(activeSubscriptions);
      if (activeSubscriptions.length > 0) {
        setSelectedSubscription(activeSubscriptions[0]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load your subscriptions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Active Subscriptions
        </h2>
        <p className="text-gray-600">
          You don&apos;t have any active subscriptions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Subscription Selector */}
      {subscriptions.length > 1 && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubscription?.id || ""}
              onChange={(e) => {
                const subscription = subscriptions.find(
                  (s) => s.id === Number(e.target.value)
                );
                setSelectedSubscription(subscription || null);
              }}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subscriptions.map((subscription) => (
                <option key={subscription.id} value={subscription.id}>
                  {subscription.subjectName} - {subscription.gradeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Attendance Component */}
      {selectedSubscription && (
        <StudentAttendance
          subscriptionId={selectedSubscription.id}
          subjectName={`${selectedSubscription.subjectName} - ${selectedSubscription.gradeName}`}
        />
      )}
    </div>
  );
}
