"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, BookOpen, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import SubscriptionsGrid from "./SubscriptionsGrid";
import SubscriptionModal from "./SubscriptionModal";
import useSubscriptionService from "@/services/subscriptionServices";
import { DeleteConfirmationModal } from "@/components/common";

const ActiveSubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentSubscription, setCurrentSubscription] =
    useState<SubscriptionType | null>(null);

  // ✅ Call hook only once
  const subscriptionService = useSubscriptionService();

  // ✅ Stable fetch function — dependency array empty (safe)
  const fetchActiveSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // only ACTIVE subs
      const data = await subscriptionService.getByStudentId(
        SubscriptionStatus.ACTIVE
      );

      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch active subscriptions");
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch once on mount
  useEffect(() => {
    fetchActiveSubscriptions();
  }, [fetchActiveSubscriptions]);

  // ✅ Delete subscription
  const handleDelete = async () => {
    if (!currentSubscription) return;
    try {
      await subscriptionService.remove(currentSubscription.id);
      setSubscriptions((prev) =>
        prev.filter((s) => s.id !== currentSubscription.id)
      );
      toast.success("Subscription deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete subscription");
    } finally {
      setCurrentSubscription(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Join your live classes from here
            </p>
          </div>
          <button
            onClick={fetchActiveSubscriptions}
            disabled={loading}
            className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-2 rounded-md text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" /> {error}
          </div>
        )}

        {/* Loading */}
        {loading && subscriptions.length === 0 && (
          <div className="text-center text-gray-500">
            Loading subscriptions...
          </div>
        )}

        {/* No subscriptions */}
        {!loading && subscriptions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No active subscriptions
            </h3>
            <p className="text-gray-500">
              You currently have no active subscriptions.
            </p>
          </div>
        )}

        {/* Subscriptions Grid */}
        {subscriptions.length > 0 && (
          <SubscriptionsGrid
            subscriptions={subscriptions}
            onClickSubscription={(sub) => setSelectedSubscription(sub)}
            onDeleteSubscription={(sub) => {
              setCurrentSubscription(sub);
              setShowDeleteModal(true);
            }}
          />
        )}

        {/* View Modal */}
        <SubscriptionModal
          subscription={selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
        />

        {/* Delete Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Confirm Deletion"
          description={`Are you sure you want to delete subscription for ${currentSubscription?.subjectName}? This action cannot be undone.`}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default ActiveSubscriptionsPage;
