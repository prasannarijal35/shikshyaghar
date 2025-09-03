"use client";
import React from "react";
import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import teamImage from "@/assets/bannerimages/banner2.png";
import Link from "next/link";

export default function OverlapMainpage() {
  return (
    <section className="py-20 overflow-hidden container">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <MotionDiv
          className="flex flex-col items-start space-y-6"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-900 leading-[1.2]">
            Empowering Education,
            <br />
            Anywhere
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
            Shikshyaghar is an innovative online platform designed to bridge the
            gap between teachers and students. It offers a seamless virtual
            space for learning, sharing knowledge, and delivering quality
            education—just like a real coaching center, but accessible from
            anywhere.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link
              href="/login"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/about-us"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </MotionDiv>

        {/* Image Section */}
        <MotionDiv
          className="relative w-full h-96 md:h-[450px] hidden md:block"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <Image
            src={teamImage}
            alt="Team discussing ideas"
            fill
            className="object-cover rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105"
          />
        </MotionDiv>
      </div>
    </section>
  );
}
