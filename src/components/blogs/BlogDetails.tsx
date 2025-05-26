"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Blog } from "@/types/blogs";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

interface BlogDetailsProps {
  blog: Blog;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  // Ensures window is only accessed client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="bg-white p-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold border-b-1 border-gray-200  text-gray-900 pb-4 mb-5">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 mb-4">
            {/* Breadcrumb or Category */}
            <p className="text-sky-600 font-medium text-sm sm:text-base">
              Blogs
            </p>

            {/* Social Sharing */}
            <div className="flex items-center space-x-4 text-gray-500 text-sm sm:text-base mt-2 sm:mt-0">
              <span>Share on</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors duration-200"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(
                  blog.title
                )}&summary=${encodeURIComponent(
                  blog.description.substring(0, 150)
                )}&source=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors duration-200"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </header>

        {/* Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title (below image for hierarchy emphasis) */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>

        {/* Blog Category Label */}
        <p className="text-sky-600 font-semibold text-sm mb-4">
          {blog.category}
        </p>

        {/* Blog Content */}
        <article className="text-gray-700 text-[18px] leading-relaxed whitespace-pre-line">
          {blog.description}
        </article>
      </div>
    </div>
  );
}
