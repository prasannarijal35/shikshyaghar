"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import banner5 from "@/assets/bannerimages/banner5.png";
import banner6 from "@/assets/bannerimages/banner6.png";
import banner4 from "@/assets/bannerimages/banner4.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const slides = [
  {
    image: banner5,
    title: "Personalized Tuition Made Easy",
    description:
      "Find the perfect tutor and learn at your own pace with fully customized sessions tailored just for you.",
    link: "/login",
    buttonText: "Start Learning",
  },
  {
    image: banner6,
    title: "Top Tutors. Verified & Trusted.",
    description:
      "Browse a network of highly-rated teachers in various subjects and book sessions with confidence.",
    link: "/teachers",
    buttonText: "View Tutors",
  },
  {
    image: banner4,
    title: "Affordable Learning for Everyone",
    description:
      "Explore flexible pricing and plans that suit your budget — with no contracts or hidden charges.",
    link: "/features/affordable-learning",
    buttonText: "See Plans",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
              />
              <div className="absolute top-[20%] left-0 flex items-center container px-4 md:px-12">
                <div className="max-w-[90%] sm:max-w-[45%] text-white z-20">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 whitespace-normal">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="bg-primary hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300 w-max"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
