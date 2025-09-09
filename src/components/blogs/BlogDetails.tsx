"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Blog } from "@/types/blogs";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 container mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          {/* Image */}
          <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Blog Header */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Category Label */}
            <p className="text-sky-600 font-semibold text-sm md:text-base uppercase tracking-wider">
              {blog.category || "Blog"}
            </p>

            {/* Title with stylish underline */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block">
              {blog.title}
              <span className="absolute left-0 -bottom-2 w-full h-2 bg-gradient-to-r from-sky-400 via-primary to-indigo-500 rounded-full opacity-70"></span>
            </h1>

            {/* Social Sharing */}
            <div className="flex items-center gap-4 text-gray-600">
              <span className="font-semibold">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                <FaFacebookF size={16} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(blog.description.substring(0, 150))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none text-gray-700">
              {blog.description}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
