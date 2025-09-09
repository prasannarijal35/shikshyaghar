"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/blogs/SingleBlogCart";
import blogService from "@/services/blogServices";
import { Blog } from "@/types/blogs";
import { toast } from "react-hot-toast";

const AllBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container bg-white pb-28">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">All Blogs</h1>

        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
