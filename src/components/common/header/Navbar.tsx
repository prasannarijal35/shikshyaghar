"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Sg_logo.png";
import { NavProfile, NavMenu } from ".";

export default function Navbar() {
  const [navbaropen, setNavbaropen] = useState<boolean>(false);
  const toggleNavBar = () => {
    setNavbaropen(!navbaropen);
  };
  return (
    <section
      id="Navbar"
      className="w-full bg-white sticky left-0 top-0 z-50 shadow-md border-b border-gray-200  "
    >
      <div className="container">
        <nav className=" relative w-full">
          <div className=" flex flex-wrap items-center justify-between ">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src={logo}
                className="h-[60px] w-full my-1"
                height={500}
                width={500}
                quality={100}
                alt=" Logo"
              />
            </Link>

            <NavProfile toggleNavBar={toggleNavBar} />
            <NavMenu navbaropen={navbaropen} />
          </div>
        </nav>
      </div>
    </section>
  );
}
