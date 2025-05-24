"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/Sg_logo.png";
import { NavProfile, NavMenu } from ".";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavBar = () => {
    setNavbarOpen(!navbarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              height={48}
              width={60}
              className="object-contain"
              priority
            />
          </Link>

          <NavProfile toggleNavBar={toggleNavBar} />
          <NavMenu navbaropen={navbarOpen} />
        </nav>
      </div>
    </header>
  );
}
