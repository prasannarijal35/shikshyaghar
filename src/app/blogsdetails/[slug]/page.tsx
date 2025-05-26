import BlogDetails from "@/components/blogs/BlogDetails";
import { blogs } from "@/data/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shikshya Ghar | Blog Details",
  description: "Detailed view of a blog post",
};

export default function Page({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
