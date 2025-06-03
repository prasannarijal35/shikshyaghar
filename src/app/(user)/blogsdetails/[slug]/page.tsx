import BlogDetails from "@/components/blogs/BlogDetails";
import { blogs } from "@/data/blog";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // <-- await params here

  let blog;
  try {
    blog = blogs.find((b) => b.slug === slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }

  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
