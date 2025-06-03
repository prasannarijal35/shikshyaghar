"use client";
import React from "react";
import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import teamImage from "@/assets/bannerimages/banner2.png";
import Link from "next/link";

export default function OverlapMainpage() {
  return (
    <section className="py-16  overflow-hidden container">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <MotionDiv
          className="flex space-y-8 flex-col items-start"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.2]">
            Empowering Education,
            <br />
            Anywhere
          </h2>
          <h2 className="text-xl font-normal text-gray-500">
            Shikshyaghar is an innovative online platform designed to bridge the
            gap between teachers and students. It offers a seamless virtual
            space for learning, sharing knowledge, and delivering quality
            education—just like a real coaching center, but accessible from
            anywhere.
          </h2>
          <Link
            href={"./login"}
            className="bg-primary hover:bg-white hover:text-primary text-white font-semibold py-3 px-6 rounded-md transition duration-300 hover:border"
          >
            Get Started
          </Link>
        </MotionDiv>

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
            className="object-cover rounded-lg shadow-xl"
          />
        </MotionDiv>
      </div>
    </section>
  );
}
