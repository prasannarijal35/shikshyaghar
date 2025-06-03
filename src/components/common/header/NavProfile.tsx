"use client";
import React from "react";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";

interface Props {
  toggleNavBar: () => void;
}
export default function Profile({ toggleNavBar }: Props) {
  return (
    <>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div className="flex gap-2">
          <Link
            href="/login"
            className="flex justify-center items-center px-5 py-1 border border-primary text-primary font-medium  hover:bg-primary hover:text-white rounded-md transition duration-300"
          >
            <span>Login</span>
          </Link>

          <Link
            href="/register"
            className="flex justify-center items-center  px-5 py-1 border border-primary text-white bg-primary font-medium  hover:text-primary hover:bg-white rounded-md transition duration-300"
          >
            <span className="font-medium ">Register</span>
          </Link>
        </div>
        <button
          type="button"
          className="flex md:hidden justify-center items-center text-gray-900 font-medium hover:text-primary hover:bg-primary/10 p-2 rounded-md "
          onClick={toggleNavBar}
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
