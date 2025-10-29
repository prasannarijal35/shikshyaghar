"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import DeleteModal from "@/components/teacherpanel/addReview/DeleteModal";
import reviewService from "@/services/reviewServices";
import { Review } from "@/types/review";
import { MessageSquare, User } from "lucide-react";

export default function ReviewTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getAllReviews();
      setReviews(data.sort((a, b) => a.id - b.id));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete a review
  const handleDelete = async () => {
    if (!selectedReview) return;
    try {
      await reviewService.deleteReview(selectedReview.id);
      setReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
      toast.success("Review deleted successfully");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete review");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Reviews
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Manage teacher reviews effectively
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-pulse shadow-lg mb-6">
            <User className="w-16 h-16 text-blue-500" />
          </div>
          <div className="text-center space-y-4 max-w-lg">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              No Reviews Found
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Reviews submitted by students will appear here once available.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  S.N
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Teacher
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Profile Picture
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Review
                </th>
                <th className="py-4 px-6 text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((review, index) => (
                <tr
                  key={review.id}
                  className="hover:bg-blue-50/50 transition-all duration-200 group"
                >
                  <td className="py-5 px-6 font-medium">{index + 1}</td>
                  <td className="py-5 px-6">{review.fullName || "N/A"}</td>
                  <td className="py-5 px-6">
                    {review.profilePicture ? (
                      <div className="w-16 h-16 overflow-hidden rounded-full">
                        <Image
                          src={review.profilePicture}
                          alt={review.fullName}
                          width={60}
                          height={60}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-6">{review.description}</td>
                  <td className="py-5 px-6 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      title="Delete"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={handleDelete}
      />
    </main>
  );
}
