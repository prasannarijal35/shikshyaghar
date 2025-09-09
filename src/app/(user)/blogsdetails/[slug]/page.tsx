import BlogDetails from "@/components/blogs/BlogDetails";
import blogService from "@/services/blogServices";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string | string[] };
}

export default async function Page({ params }: PageProps) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  let blog;
  try {
    blog = await blogService.getBlogBySlug(slug);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }

  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
