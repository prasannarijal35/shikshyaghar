import Image from "next/image";
import { Blog } from "@/types/blogs";
import Link from "next/link";

type Props = {
  blog: Blog;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md  w-full max-w-sm hover:shadow-lg transition-shadow duration-200">
      <Image
        src={blog.image}
        alt={blog.title}
        height={3000}
        width={3000}
        quality={100}
        className="rounded-t-xl mb-4 w-full h-56 object-cover"
      />
      <p className="text-sky-500 font-semibold p-4 text-sm mb-1">
        {blog.category}
      </p>
      <Link href={`/blogsdetails/${blog.slug}`}>
        <h2 className="text-lg font-semibold text-gray-800 px-4 pb-4 hover:text-primary transition-colors duration-200 cursor-pointer">
          {blog.title}
        </h2>
      </Link>
    </div>
  );
};

export default BlogCard;
