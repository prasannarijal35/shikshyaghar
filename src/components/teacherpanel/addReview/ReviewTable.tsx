"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import DeleteModal from "@/components/teacherpanel/addReview/DeleteModal";
import AddReviewModal from "@/components/teacherpanel/addReview/AddReviewModal";
import reviewService from "@/services/reviewServices";
import { Review } from "@/types/review"; 

export default function ReviewTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getReviewsByTeacher();
      setReviews(data.sort((a, b) => a.id - b.id));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch teacher's reviews");
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

  // Add a new review
  const handleAddReview = async (reviewText: string) => {
  try {
    const newReview = await reviewService.createReview(reviewText); 
    setReviews((prev) => [...prev, newReview]);
    toast.success("Review added successfully");
    setShowAddModal(false);
  } catch (error: any) {
    toast.error(error?.message || "Failed to add review");
  }
};

  if (loading) return <p className="p-6">Loading reviews...</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">My Reviews</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          <FaPlus /> Add Review
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-4 text-left text-[15px] font-medium">S.N</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Review</th>
              <th className="py-4 px-4 text-left text-[15px] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {reviews.map((review, index) => (
              <tr key={review.id} className="border-t hover:bg-primary/10">
                <td className="py-5 px-4">{index + 1}</td>
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

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Review"
        onConfirm={handleAddReview}
      />

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
