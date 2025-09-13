// src/services/reviewServices.ts
import myAxios from "./apiServices";
import { getUser } from "@/utils/localStorage";
import { Review } from "@/types/review"; 

interface GetReviewsFilters {
  page?: number;
  limit?: number;
}

const reviewService = {
  getAllReviews: async (filters?: GetReviewsFilters): Promise<Review[]> => {
    const res = await myAxios.get("/reviews", { params: filters });
    return res.data.data.reviews as Review[]; // matches backend response
  },

  getReviewsByTeacher: async (filters?: GetReviewsFilters): Promise<Review[]> => {
    const teacherId = getUser()?.teacher?.id;
    if (!teacherId) throw new Error("Teacher not authenticated.");

    const res = await myAxios.get(`/reviews/teacher/${teacherId}`, { params: filters });
    return res.data.data.reviews as Review[];
  },

  createReview: async (description: string): Promise<Review> => {
    const teacherId = getUser()?.teacher?.id;
    if (!teacherId) throw new Error("Teacher not authenticated.");

    const res = await myAxios.post("/reviews", { description, teacherId });
    return res.data.data as Review;
  },

  updateReview: async (id: number, description: string): Promise<Review> => {
    const res = await myAxios.put(`/reviews/${id}`, { description });
    return res.data.data as Review;
  },

  deleteReview: async (id: number): Promise<void> => {
    await myAxios.delete(`/reviews/${id}`);
  },
};

export default reviewService;
