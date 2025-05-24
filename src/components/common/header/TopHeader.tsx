"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "@/assets/logo/Sg_logo.png";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[#dceaef]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo} // Replace with your logo path
            alt="Neema Academy Logo"
            width={180}
            height={50}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 font-medium text-black">
          <Link href="/About-us" className="hover:text-[#1699c6]">
            About
          </Link>
          <div className="relative group">
            <span className="cursor-pointer hover:text-[#1699c6] flex items-center">
              Programs
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-3 rounded-md z-50 w-64">
              <Link
                href="https://www.youtube.com/@Mission12.neemaacademy"
                target="_blank"
                className="block py-2 hover:text-[#1699c6]"
              >
                Grade 12 Exam Preparation
              </Link>
              <Link
                href="https://www.neemamedical.com/"
                target="_blank"
                className="block py-2 hover:text-[#1699c6]"
              >
                Neema Medical
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f6fbff] px-4 pb-4 space-y-2">
          <Link href="/About-us" className="block hover:text-[#1699c6]">
            About
          </Link>
          <details className="group">
            <summary className="cursor-pointer hover:text-[#1699c6]">
              Programs
            </summary>
            <div className="ml-4 mt-2 space-y-1">
              <Link
                href="https://www.youtube.com/@Mission12.neemaacademy"
                target="_blank"
                className="block hover:text-[#1699c6]"
              >
                Grade 12 Exam Preparation
              </Link>
              <Link
                href="https://www.neemamedical.com/"
                target="_blank"
                className="block hover:text-[#1699c6]"
              >
                Neema Medical
              </Link>
            </div>
          </details>
        </div>
      )}
    </header>
  );
};

export default Header;
