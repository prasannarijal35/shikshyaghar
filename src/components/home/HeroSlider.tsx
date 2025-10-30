"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import { MotionDiv } from "@/components/MotionDiv";

// Define allowed animation types
type AnimationType = "up" | "left" | "right";

// Slide type
interface Slide {
  video: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
  animation: AnimationType;
}

const slides: Slide[] = [
  {
    video: "/videos/video4.mp4",
    title: "Personalized Tuition Made Easy",
    description:
      "Find the perfect tutor and learn at your own pace with fully customized sessions tailored just for you.",
    link: "/login",
    buttonText: "Start Learning",
    animation: "up",
  },
  {
    video: "/videos/video2.mp4",
    title: "Top Tutors. Verified & Trusted.",
    description:
      "Browse a network of highly-rated teachers in various subjects and book sessions with confidence.",
    link: "/teachers",
    buttonText: "View Tutors",
    animation: "left",
  },
  {
    video: "/videos/video3.mp4",
    title: "Affordable Learning for Everyone",
    description:
      "Explore flexible pricing and plans that suit your budget — with no contracts or hidden charges.",
    link: "/features/affordable-learning",
    buttonText: "See Plans",
    animation: "right",
  },
];

// Container for staggered reveal
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.35, delayChildren: 0.2 },
  },
};

// Variants for each animation style + slight zoom
const itemVariants: Record<
  AnimationType,
  {
    hidden: Record<string, any>;

    show: Record<string, any>;
  }
> = {
  up: {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  },
  left: {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  },
  right: {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  },
};

export default function HeroSlider() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        speed={1800}
        loop
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Background Video with Ken Burns */}
              <video
                src={slide.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover animate-kenburns"
              />

              {/* Dark Overlay for contrast */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/20" />

              {/* Staggered Content */}
              <div className="absolute top-1/4 inset-x-0 flex items-center container px-4 md:px-12 z-20">
                <MotionDiv
                  key={index}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="max-w-[95%] sm:max-w-[55%] text-white"
                >
                  <MotionDiv variants={itemVariants[slide.animation]}>
                    <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                  </MotionDiv>
                  <MotionDiv variants={itemVariants[slide.animation]}>
                    <p className="text-base md:text-xl mb-8 drop-shadow-md">
                      {slide.description}
                    </p>
                  </MotionDiv>
                  <MotionDiv variants={itemVariants[slide.animation]}>
                    <div className="flex gap-4">
                      {/* Primary Button */}
                      <Link
                        href={slide.link}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 w-max"
                      >
                        {slide.buttonText}
                      </Link>
                      {/* Secondary Button */}
                      <Link
                        href="/about"
                        className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300 w-max"
                      >
                        Learn More
                      </Link>
                    </div>
                  </MotionDiv>
                </MotionDiv>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ken Burns Animation */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-kenburns {
          animation: kenburns 15s ease-in-out infinite alternate;
        }

        /* Optimize for Mobile: Disable Ken Burns (use static video) */
        @media (max-width: 768px) {
          .animate-kenburns {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
