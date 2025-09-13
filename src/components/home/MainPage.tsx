"use client";

import React, { useEffect, useState } from "react";
import { Blogs } from "@/components/blogs";
import OverlapMainpage from "./OverlapMainpage";
import ReviewSlider from "./Review";
import reviewService from "@/services/reviewServices";
import { Review } from "@/types/review"; // ✅ import with curly braces
import { toast } from "react-hot-toast";

export default function MainPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from backend
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getAllReviews(); // <-- backend call
      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <OverlapMainpage />
      {loading ? (
        <p className="text-center py-10 text-gray-600">Loading reviews...</p>
      ) : (
        <ReviewSlider reviews={reviews} />
      )}
      <Blogs />
    </>
  );
}
