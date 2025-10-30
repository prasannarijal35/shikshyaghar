import BlogDetails from "@/components/blogs/BlogDetails";
import Breadcrumb from "@/components/common/BreadCrumb";
import blogService from "@/services/blogServices";
import { notFound } from "next/navigation";

// ✅ DO NOT use PageProps from Next.js — define your own plain interface
interface BlogPageProps {
  params: {
    slug: string;
  };
}

// ✅ Keep the function async, but params is just an object
export default async function Page({ params }: BlogPageProps) {
  const { slug } = params;

  const blog = await blogService.getBlogBySlug(slug).catch((error) => {
    console.error("Error fetching blog:", error);
    return null;
  });

  if (!blog) return notFound();

  return (
    <>
      <Breadcrumb title="Blogs" subTitle="blogs" subTitleLink="/blogs" />
      <BlogDetails blog={blog} />
    </>
  );
}

// ✅ Add this: helps Next.js correctly infer the type of params at build time
export async function generateStaticParams() {
  // Returning empty list or prebuilt slugs prevents Promise confusion
  return [];
}
