"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-screen bg-[url('/your-image.jpg')] bg-cover bg-center text-white">
      <div className="relative flex flex-col justify-center h-full px-6 md:px-16 max-w-4xl container">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            A Successful <br />
            Study platform for <br />
            students
          </h1>
          <p className="text-lg md:text-xl mb-8 break-words whitespace-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit,
            luctus nec ullamcorper mattis, pulvinar dapibus.
          </p>
          <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
            READ MORE
          </button>
        </div>
      </div>
    </section>
  );
}
