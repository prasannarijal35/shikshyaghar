"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Review } from "@/types/review";
import Image from "next/image";

interface ReviewSliderProps {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: ReviewSliderProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-12 bg-[#f0f8ff] text-center">
        <p className="text-gray-600">No reviews available</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-[#f0f8ff]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          What Our Teachers Say
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          autoplay={{ delay: 5000 }}
          loop
          className="review-swiper"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-full flex">
              <div className="review-card flex flex-col justify-between w-full h-full bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Teacher photo slightly smaller */}
                <div className="flex flex-col items-center mt-3">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg mb-3">
                    <Image
                      src={review.profilePicture || "/default-avatar.png"}
                      alt={review.fullName}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-blue-500 text-center">
                    {review.fullName}
                  </h4>
                  <p className="text-sm text-gray-500 mb-1 text-center capitalize">
                    {review.gender || "Teacher"}
                  </p>
                </div>
                <p className="text-gray-700 text-base italic text-center mt-3">
                  “{review.description}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
