import React from "react";

import BreadCrumb from "@/components/common/BreadCrumb";
import BlogCard from "@/components/blogs/SingleBlogCart";
import { blogs } from "@/data/blog";

export default function page() {
  return (
    <>
      <BreadCrumb title={"Blogs"} subTitle="blogs" subTitleLink="/blogs" />
      <div className="container bg-white pb-28">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">All Blogs</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
