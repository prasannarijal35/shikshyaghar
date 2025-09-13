"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import DeleteModal from "@/components/teacherpanel/addReview/DeleteModal";
import reviewService from "@/services/reviewServices";
import { Review } from "@/types/review";

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

  if (loading) return <p className="p-6">Loading reviews...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">All Reviews</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">S.N</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Teacher</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Profile Picture</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Review</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {reviews.map((review, index) => (
              <tr key={review.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{index + 1}</td>
                <td className="py-5 px-4">{review.fullName || "N/A"}</td>
                <td className="py-5 px-4">
                  {review.profilePicture ? (
                    <div className="w-16 h-16 overflow-hidden">
                      <Image
                        src={review.profilePicture}
                        alt={review.fullName}
                        width={60}
                        height={60}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500">
                      N/A
                    </div>
                  )}
                </td>
                <td className="py-5 px-4">{review.description}</td>
                <td className="py-5 px-4">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 rounded-md text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-200"
                    title="Delete"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
