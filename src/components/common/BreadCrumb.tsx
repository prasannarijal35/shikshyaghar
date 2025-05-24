import Image from "next/image";
import Link from "next/link";
import React from "react";
import book from "@/assets/extraimages/BreadCrumbimage.jpeg";
import { AiOutlineHome } from "react-icons/ai";

interface Props {
  title: string;
  subTitle?: string;
  subTitleLink?: string;
  description?: string;
}

export default function Breadcrumb({
  title,
  subTitle,
  subTitleLink,
  description,
}: Props) {
  return (
    <section className="relative w-full  py-16 bg-gray-900 mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
      <div className="absolute inset-0 z-0">
        <Image
          src={book}
          layout="fill"
          objectFit="cover"
          alt="banner"
          quality={100}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>

      <div className="relative z-10 container flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-200 font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-white">
            <AiOutlineHome size={22} />
            <span>Home</span>
          </Link>
          {subTitle && (
            <>
              <span>/</span>
              <Link href={subTitleLink ?? "#"} className="hover:text-white">
                {subTitle}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="font-semibold">{title}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-wide text-white">{title}</h1>
        {description && (
          <p className="text-gray-300 text-sm md:text-base max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
