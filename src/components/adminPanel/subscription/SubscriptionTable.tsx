"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { UserCheck, BookOpen } from "lucide-react";
import ViewSubscriptionModal from "./ViewModel";
import EditSubscriptionModal from "./EditModel";
import { DeleteConfirmationModal } from "@/components/common";
import useSubscriptionService from "@/services/subscriptionServices";
import { SubscriptionType } from "@/types/subscription";

const PAGE_SIZE = 10;

export default function SubscriptionManagementTable() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [viewSubscription, setViewSubscription] =
    useState<SubscriptionType | null>(null);
  const [editSubscription, setEditSubscription] =
    useState<SubscriptionType | null>(null);
  const [deleteSubscriptionId, setDeleteSubscriptionId] = useState<
    number | null
  >(null);
  const [deleteSubscriptionName, setDeleteSubscriptionName] =
    useState<string>("");

  const subscriptionService = useSubscriptionService();

  const fetchSubscriptions = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const { subscriptions, totalPages: tp } =
        await subscriptionService.getAll({
          page: pageNumber,
          limit: PAGE_SIZE,
          status: statusFilter !== "ALL" ? statusFilter : undefined,
          teacherName: searchQuery,
          subjectName: searchQuery,
        });
      setSubscriptions(subscriptions);
      setTotalPages(tp);
    } catch (error: any) {
      toast.error(`Failed to fetch subscriptions: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, searchQuery]);

  const handleDelete = async () => {
    if (!deleteSubscriptionId) return;
    try {
      await subscriptionService.remove(deleteSubscriptionId);
      toast.success("Subscription deleted successfully");
      setDeleteSubscriptionId(null);
      fetchSubscriptions(page);
    } catch (error: any) {
      toast.error(
        `Failed to delete subscription: ${error?.message || "Unknown error"}`
      );
    }
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading subscriptions...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Filter subscriptions by search query (client-side)
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Subscription Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage your student subscriptions efficiently
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-100/70 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="EXPIRED">Expired</option>
            <option value="FAILED">Failed</option>
          </select>
          <input
            type="text"
            placeholder="Search student/teacher/subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[250px] bg-gray-100/70 backdrop-blur-sm border border-gray-200 text-gray-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      {filteredSubscriptions.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <UserCheck className="w-16 h-16 text-blue-500 mb-4" />
          <p className="text-gray-600 text-lg">No subscriptions found.</p>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Student
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Status
                  </th>

                  <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubscriptions.map((sub, index) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-purple-50/50 transition-all duration-200"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">{sub.studentName}</td>
                    <td className="py-4 px-6">{sub.teacherName}</td>
                    <td className="py-4 px-6">{sub.subjectName}</td>
                    <td className="py-4 px-6">{sub.status}</td>

                    <td className="py-4 px-6 flex justify-end gap-2">
                      <button
                        onClick={() => setViewSubscription(sub)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <FiEye className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => setEditSubscription(sub)}
                        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteSubscriptionId(sub.id);
                          setDeleteSubscriptionName(
                            `${sub.studentName} - ${sub.subjectName}`
                          );
                        }}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modals */}
      <ViewSubscriptionModal
        isOpen={!!viewSubscription}
        onClose={() => setViewSubscription(null)}
        subscription={viewSubscription}
      />
      <EditSubscriptionModal
        isOpen={!!editSubscription}
        onClose={() => setEditSubscription(null)}
        subscription={editSubscription}
        onSave={() => {
          fetchSubscriptions(page);
          setEditSubscription(null);
        }}
      />
      <DeleteConfirmationModal
        isOpen={!!deleteSubscriptionId}
        onClose={() => setDeleteSubscriptionId(null)}
        onConfirm={handleDelete}
        title="Delete Subscription"
        description={`Are you sure you want to delete ${deleteSubscriptionName}?`}
      />
    </main>
  );
}
