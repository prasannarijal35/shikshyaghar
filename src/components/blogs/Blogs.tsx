import Link from "next/link";
import BlogCard from "@/components/blogs/SingleBlogCart";
import { blogs } from "@/data/blog";

const BlogPreviewPage = () => {
  return (
    <section className="  max-w-6xl mx-auto  py-20 container ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <Link
          href="/blogs/all"
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
