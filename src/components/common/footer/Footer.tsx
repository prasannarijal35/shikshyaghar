import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { ImLocation } from "react-icons/im";
import { BsCCircle } from "react-icons/bs";
// import logo from "@/assets/images/logos/logo.png"; // Replace with Shikshyaghar's logo

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (

    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* Logo and About */}
        <div className="space-y-4">
          {/* <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Shikshyaghar Logo"
              width={40}
              height={40}
              className="rounded-full bg-white p-1"
            />
            <h2 className="text-2xl font-bold">Shikshyaghar</h2>
          </div> */}
          <p className="text-sm text-gray-100">
            Shikshyaghar is a platform connecting passionate teachers with eager
            learners, offering top-tier online coaching for academic excellence.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              href="https://facebook.com"
              className="hover:text-secondary transition"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-secondary transition"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-secondary transition"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://youtube.com"
              className="hover:text-secondary transition"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-secondary uppercase">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-gray-100">
            <li>
              <Link href="/about" className="hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-secondary">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/teachers" className="hover:text-secondary">
                Our Teachers
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-secondary">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Student Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-secondary uppercase">
            Students
          </h3>
          <ul className="space-y-2 text-sm text-gray-100">
            <li>
              <Link href="/dashboard" className="hover:text-secondary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-secondary">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-secondary">
                Register
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-secondary">
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-secondary uppercase">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-gray-100">
            <li className="flex items-center gap-2">
              <MdOutlineMailOutline />{" "}
              <a href="mailto:support@shikshyaghar.com">
                support@shikshyaghar.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <LuPhone /> <a href="tel:+9779800001234">+977-9800001234</a>
            </li>
            <li className="flex items-center gap-2">
              <ImLocation /> Kathmandu, Nepal
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/30 pt-4 px-6 text-center text-sm text-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1">
            <BsCCircle /> {currentYear} Shikshyaghar. All Rights Reserved.
          </div>
          <div className="mt-2 md:mt-0">
            Made with ❤️ for Students and Teachers
          </div>
        </div>
      </div>
    </footer>

  );
}
