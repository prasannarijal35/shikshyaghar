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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="bg-white p-6 sm:p-10 rounded-lg shadow-md max-w-5xl mx-auto my-12">
      {/* Header Section */}
      <header className="mb-5 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-semibold text-gray-900 mb-5">{blog.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          {/* Category */}
          <p className="text-sky-600 font-semibold text-sm sm:text-base">{blog.category || "Blogs"}</p>

          {/* Social Sharing */}
          <div className="flex items-center space-x-5 text-gray-500 text-sm sm:text-base">
            <span className="whitespace-nowrap">Share on</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
                blog.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-200"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                currentUrl
              )}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(
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
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg mb-5">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Title Below Image */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5">{blog.title}</h2>

      {/* Category Label */}
      <p className="text-sky-600 font-semibold text-sm mb-5">{blog.category || ""}</p>

      {/* Blog Content */}
      <article className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
        {blog.description}
      </article>
    </div>
  );
}
