"use client";

import React from "react";
import Image from "next/image";
import { MotionDiv } from "@/components/MotionDiv";
import teamImage from "@/assets/bannerimages/banner2.png";

export default function OverlapMainpage() {
  return (
    <section className="py-16 px-6 md:px-20 overflow-hidden container">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <MotionDiv
          className="flex space-y-8 flex-col items-start"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.2]">
            You Need the <br /> Best Advice
          </h2>
          <h2 className="text-xl font-normal text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem ullam
            consectetur asperiores at consequatur porro nesciunt quo vitae
            adipisci reiciendis. consectetur asperiores at consequatur porro
            nesciunt quo vitae adipisci reiciendis.
          </h2>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
            Read More
          </button>
        </MotionDiv>
        <MotionDiv
          className="relative w-full h-96 md:h-[450px]"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.4 }} // 👈 repeatable animation
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
