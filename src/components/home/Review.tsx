"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Review } from "@/types/review";
import Image from "next/image";

interface Props {
  reviews: Review[];
}

export default function ReviewSlider({ reviews }: Props) {
  return (
    <section className="py-16 bg-[#f0f8ff]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
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
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review.id}
              className="transition-transform duration-300"
            >
              {({ isActive }) => (
                <div
                  className={`review-card bg-white p-6 rounded-2xl shadow-2xl hover:shadow-lg transition-transform duration-300 ${
                    isActive ? "scale-105 shadow-lg" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-4"
                    />
                    <h4 className="text-lg font-semibold text-blue-500 text-center">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3 text-center">
                      {review.occupation}
                    </p>
                  </div>
                  <p className="text-gray-700 text-sm italic text-center">
                    “{review.comment}”
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination flex justify-center mt-8" />
      </div>
    </section>
  );
}
