import BlogDetails from "@/components/blogs/BlogDetails";
import Breadcrumb from "@/components/common/BreadCrumb";
import blogService from "@/services/blogServices";
import { notFound } from "next/navigation";

// Explicitly define PageProps
interface BlogPageProps {
  params: {
    slug: string;
  };
}

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
