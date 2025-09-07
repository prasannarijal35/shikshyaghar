"use client";
import Image from "next/image";
import React from "react";
import heroTeacher from "@/assets/bannerimages/banner2.png";
import heroStudents from "@/assets/bannerimages/banner3.png";

const Hero = () => {
  const scrollToRegistration = () => {
    const registrationElement = document.getElementById("registration");
    if (registrationElement) {
      registrationElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[float_4s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Heading + CTA */}
          <div className="text-center lg:text-left animate-[fadeInUp_0.6s_ease-out_forwards]">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Inspire the{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500">
                Next Generation
              </span>
              . Teach with Us.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join passionate educators making a difference in students’ lives
              while earning a sustainable income through online teaching.
            </p>
            <div className="flex justify-center lg:justify-start">
              {/* Option 1: Scroll to registration section */}
              <button
                onClick={scrollToRegistration}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover-lift animate-[pulse_2s_ease-in-out_infinite]"
              >
                Register as a Teacher
              </button>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[300px] md:w-[400px] lg:w-[500px]">
              <Image
                src={heroTeacher}
                alt="Online Teacher"
                className="rounded-3xl shadow-2xl"
                priority
              />
              {/* Optional overlay of students */}
              <div className="absolute -bottom-8 -right-12 w-32 md:w-40 lg:w-48">
                <Image
                  src={heroStudents}
                  alt="Students Group"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
            {/* Decorative floating shapes */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-80 animate-[float_5s_ease-in-out_infinite]" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-400 rounded-full opacity-60 animate-[float_6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
