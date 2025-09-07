"use client";

import { useState, useEffect } from "react";
import { RefreshCw, BookOpen, AlertCircle } from "lucide-react";
import { SubscriptionType, SubscriptionStatus } from "@/types/subscription";
import SubscriptionFilter from "./SubscriptionFilter";
import SearchBar from "./SearchBar";
import SubscriptionsGrid from "./SubscriptionsGrid";

// Mock API call (replace with actual)
const fetchSubscriptionsAPI = async (): Promise<SubscriptionType[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return []; // Replace with actual API call
};

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [filterStatus, setFilterStatus] = useState<SubscriptionStatus | "ALL">(
    "ALL"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await fetchSubscriptionsAPI();
      setSubscriptions(data);
    } catch {
      setError("Failed to fetch subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesStatus = filterStatus === "ALL" || sub.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      sub.teacherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subjectName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
            onClick={fetchSubscriptions}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col lg:flex-row lg:items-center gap-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SubscriptionFilter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" /> {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-500">
            Loading subscriptions...
          </div>
        )}

        {!loading && filteredSubscriptions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscriptions found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "ALL"
                ? "Try adjusting your filters or search terms"
                : "You haven't subscribed to any courses yet"}
            </p>
          </div>
        )}

        {filteredSubscriptions.length > 0 && (
          <SubscriptionsGrid subscriptions={filteredSubscriptions} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
