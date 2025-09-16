"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Blog } from "@/types/blogs";

interface BlogDetailsProps {
  blog: Blog;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 mb-20">
      <div className="w-full  py-10 border-b border-blue-200">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Blog Details
          </h2>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Dive deeper into our latest stories, insights, and updates.
          </p>
          <span className="mt-4 inline-block w-20 h-1 bg-orange-500 rounded-full"></span>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh] group animate-fade-in">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover transition-transform duration-500  "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className=" container absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <span className="inline-block px-3 py-1 mb-4 text-xs md:text-sm font-semibold bg-blue-700 rounded-full shadow-md hover:bg-blue-600 transition-colors">
            {blog.category || "General"}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight relative">
            {blog.title}
            <span className="absolute left-0 bottom-[-10px] w-24 h-1 bg-orange-500 rounded-full animate-float"></span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-200">
            {new Date(blog.createdAt || Date.now()).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-10 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Floating Social Share (Desktop) */}
        <aside className="hidden lg:block relative lg:w-16">
          <div className="sticky top-24 flex flex-col items-center space-y-4">
            <span className="text-sm font-semibold text-gray-600 -rotate-90 origin-center absolute top-1/2 -left-10 transform -translate-y-1/2 whitespace-nowrap">
              SHARE
            </span>
            {[
              {
                href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`,
                icon: <FaFacebookF size={18} />,
                color: "bg-blue-700 hover:bg-blue-600",
              },
              {
                href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(blog.title)}`,
                icon: <FaTwitter size={18} />,
                color: "bg-sky-500 hover:bg-sky-400",
              },
              {
                href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(
                  blog.title
                )}&summary=${encodeURIComponent(
                  blog.description.substring(0, 150)
                )}`,
                icon: <FaLinkedinIn size={18} />,
                color: "bg-blue-800 hover:bg-blue-700",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </aside>

        {/* Main Blog Content */}
        <main className="flex-1 w-full lg:w-2/3">
          {/* Social Share (Mobile) */}
          <div className="flex items-center gap-4 py-4 lg:hidden">
            <span className="font-semibold text-gray-600">Share:</span>
            {[
              {
                href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`,
                icon: <FaFacebookF size={16} />,
                color: "bg-blue-700 hover:bg-blue-600",
              },
              {
                href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(blog.title)}`,
                icon: <FaTwitter size={16} />,
                color: "bg-sky-500 hover:bg-sky-400",
              },
              {
                href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(blog.title)}`,
                icon: <FaLinkedinIn size={16} />,
                color: "bg-blue-800 hover:bg-blue-700",
              },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-white rounded-full transition ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Blog Description */}
          <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8 animate-fade-in-up">
            {blog.description}
          </article>
        </main>
      </div>
    </div>
  );
};

export default BlogDetails;
