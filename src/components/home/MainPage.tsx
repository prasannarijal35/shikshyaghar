"use client";
import React from "react";

export default function MainPage() {
  return (
    <main
      className="relative h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/bgimage.png')" }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-0" /> */}

      <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-20 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          A Successful <br />
          Study platform for <br />
          students
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit,
          luctus nec ullamcorper mattis, pulvinar dapibus.
        </p>
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
          READ MORE
        </button>
      </div>
    </main>
  );
}
