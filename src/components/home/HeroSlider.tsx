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

const slides = [
  {
    image: banner5,
    title: "A Successful Study platform for students",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit, luctus nec ullamcorper mattis, pulvinar dapibus.",
  },
  {
    image: banner6,
    title: "Learn from the Best Teachers",
    description:
      "Join classes with expert tutors and improve your skills effectively.",
  },
  {
    image: banner4,
    title: "Flexible and Affordable Tuition",
    description:
      "Study at your own pace with affordable rates tailored for you.",
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
              <div className="absolute top-35 left-0 flex items-center container">
                <div className="max-w-[45%] text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 whitespace-normal">
                    {slide.description}
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300 w-max">
                    READ MORE
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
