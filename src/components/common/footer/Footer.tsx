import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { ImLocation } from "react-icons/im";
import { BsCCircle } from "react-icons/bs";
import logo from "@/assets/logo/Sg_logo.png";
import photo from "@/assets/extraimages/girlimage.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-12">
      <div className="px-6 container absolute top-[-60px] z-0">
        <div className="bg-[#06034D] w-full rounded-lg text-white py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-6">
            {/* Text Content */}
            <div className="flex-1 ">
              <h2 className="text-4xl font-semibold mb-16">
                Need to talk with our Experts?
              </h2>

              <button
                aria-label="Book an Appointment"
                className="bg-primary text-[#eaeaf3] font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-primary  transform transition duration-300"
              >
                Book an Appointment
              </button>
            </div>

            {/* Image */}
            <div className="hidden md:block absolute md:right-10 lg:right-36 bottom-5 md:bottom-10">
              <Image
                src={photo}
                alt="Expert consultation"
                width={400}
                height={300}
                className="w-[150px] md:w-[200px] lg:w-[300px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-indigo-200 pt-[200px]">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 ">
              <Image
                src={logo}
                alt="Shikshyaghar Logo"
                width={120}
                height={100}
                className="w-[110px]"
              />
            </div>
            <div className="text-lg text-[#06034D] space-y-2">
              <p className="font-semibold">
                Hunch Complex, Bagar, Pokhara, Nepal
              </p>

              <p>+977-1-000000000 / 40000</p>

              <p>
                <a
                  href="mailto:info@neemaacademy.com"
                  className=" hover:text-[#06034D]"
                >
                  info@shikshyaghar.com
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary uppercase">
              Explore
            </h3>
            <ul className="space-y-2 text-md text-[#06034D]">
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
            <h3 className="text-lg font-semibold mb-3 text-primary uppercase">
              Students
            </h3>
            <ul className="space-y-2 text-md text-[#06034D]">
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
            <h3 className="text-lg font-semibold mb-3 text-primary uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-[#06034D]">
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
                <ImLocation /> Pokhara, Nepal
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-10 border-t-[1px] border-white/40 pt-6 pb-5 text-sm text-[#06034D]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Left Side Links & Copyright */}
            <div className="space-y-4">
              <div className="flex gap-6 flex-wrap">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </div>
              <div className="flex items-center gap-1">
                <BsCCircle />
                <span>{currentYear} Shikshyaghar. All Rights Reserved.</span>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <div className="text-primary text-[16px] font-semibold mb-2 text-right">
                FOLLOW US ON
              </div>
              <div className="flex gap-4 text-xl ">
                <div className="text-[#1877F2] hover:text-white rounnd-full p-2 hover:bg-[#1877F2] rounded-full ">
                  <Link href="https://facebook.com" target="_blank">
                    <FaFacebookF />
                  </Link>
                </div>
                <div className="text-[#E1306C] hover:text-white rounnd-full p-2 hover:bg-[#E1306C] rounded-full">
                  <Link href="https://instagram.com" target="_blank">
                    <FaInstagram />
                  </Link>
                </div>
                <div className="text-[#1DA1F2] hover:text-white rounnd-full p-2 hover:bg-[#1DA1F2] rounded-full">
                  <Link href="https://twitter.com" target="_blank">
                    <FaTwitter />
                  </Link>
                </div>
                <div className="text-[#FF0000] hover:text-white rounnd-full p-2 hover:bg-[#FF0000] rounded-full">
                  <Link href="https://youtube.com" target="_blank">
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
