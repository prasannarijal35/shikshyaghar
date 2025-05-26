import Image from "next/image";
import React from "react";
import image1 from "@/assets/about-us/aboutus.png";
import BreadCrumb from "@/components/common/BreadCrumb";

export default function AboutUs() {
  return (
    <>
      <BreadCrumb title={"About Us"} />
      <div className="container mx-auto px-4 pb-20 bg-primary/15">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <Image
              className="w-full h-auto max-h-[500px] object-cover rounded-xl "
              src={image1}
              alt="Team collaborating"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-primary">About Us</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are committed to building a platform that empowers students and
              teachers to connect, grow, and thrive. Our coaching system
              simplifies the process of finding the right mentor for your
              academic or professional needs.
            </p>
            <p className="text-md text-gray-700">
              Whether you&apos;re a passionate educator looking to share
              knowledge or a curious learner seeking guidance, our mission is to
              bring both worlds together through intuitive and accessible tools.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-12">
          <div className="bg-gray-100 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To bridge the gap between knowledge seekers and providers by
              offering a seamless digital platform where learning is
              personalized, flexible, and effective.
            </p>
          </div>

          <div className="bg-gray-100 p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Empowerment through education</li>
              <li>Accessibility and inclusion for all learners</li>
              <li>Innovation in teaching and learning</li>
              <li>Transparency and trust in all interactions</li>
            </ul>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl text-center shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
            <p className="mb-6">
              Whether you&apos;re a student or a teacher, start your journey
              with us today and become part of a growing learning community.
            </p>
            <a
              href="/signup"
              className="inline-block border border-white bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition duration-200 "
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
