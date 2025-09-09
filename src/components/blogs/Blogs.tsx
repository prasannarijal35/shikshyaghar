"use client";

import Link from "next/link";
import BlogCard from "@/components/blogs/SingleBlogCart";
import blogService from "@/services/blogServices";
import { useEffect, useState } from "react";
import { Blog } from "@/types/blogs";

const BlogPreviewPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;
  if (blogs.length === 0) return <p className="text-center py-10">No blogs found.</p>;

  return (
    <section className="container max-w-6xl mx-auto py-20 pb-36">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <Link
          href="/blogs"
          className="inline-flex items-center text-primary font-semibold gap-2 px-4 py-2 rounded-md hover:bg-primary/10 transition duration-300 ease-in-out"
        >
          View More
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogPreviewPage;
