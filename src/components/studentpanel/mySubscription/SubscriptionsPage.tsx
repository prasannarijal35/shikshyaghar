"use client";

import { useState, useEffect, useMemo } from "react";
import { RefreshCw, BookOpen, AlertCircle } from "lucide-react";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import SubscriptionFilter from "./SubscriptionFilter";
import SearchBar from "./SearchBar";
import SubscriptionsGrid from "./SubscriptionsGrid";
import SubscriptionModal from "./SubscriptionModal";
import useSubscriptionService from "@/services/subscriptionServices";

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [filterStatus, setFilterStatus] = useState<SubscriptionStatus | "ALL">(
    "ALL"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType | null>(null);

  const subscriptionService = useSubscriptionService();

  const fetchSubscriptions = async (status?: string) => {
    try {
      console.log("Fetching subscriptions... status:", status);
      setLoading(true);
      setError(null);

      // Call API
      const data = await subscriptionService.getByStudentId(status);

      if (!Array.isArray(data)) {
        console.warn("API did not return an array:", data);
      }

      setSubscriptions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch subscriptions");
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Log state whenever it changes
  useEffect(() => {
    console.log("Subscriptions state updated:", subscriptions);
  }, [subscriptions]);

  useEffect(() => {
    fetchSubscriptions(filterStatus === "ALL" ? undefined : filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const filteredSubscriptions = useMemo(() => {
    if (!Array.isArray(subscriptions)) return [];
    return subscriptions.filter((sub) => {
      const matchesStatus =
        filterStatus === "ALL" || sub.status === filterStatus;
      const matchesSearch =
        searchTerm === "" ||
        sub.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subjectName?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [subscriptions, filterStatus, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Subscriptions
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your learning subscriptions
            </p>
          </div>
          <button
            onClick={() =>
              fetchSubscriptions(
                filterStatus === "ALL" ? undefined : filterStatus
              )
            }
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SubscriptionFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" /> {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500">
            Loading subscriptions...
          </div>
        )}

        {/* No subscriptions */}
        {!loading && filteredSubscriptions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscriptions found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}

        {/* Subscriptions Grid */}
        {filteredSubscriptions.length > 0 && (
          <SubscriptionsGrid
            subscriptions={filteredSubscriptions}
            onClickSubscription={(id) => {
              const sub = subscriptions.find((s) => s.id === id) ?? null;
              setSelectedSubscription(sub);
            }}
          />
        )}

        {/* Modal */}
        <SubscriptionModal
          subscription={selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
        />
      </div>
    </div>
  );
};

export default SubscriptionsPage;
