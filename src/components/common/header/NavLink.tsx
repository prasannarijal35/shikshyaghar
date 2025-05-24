"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  title: string;
  link: string;
  dropdowns?: {
    title: string;
    link: string;
  }[];
}
export default function NavLink({ title, link, dropdowns }: Props) {
  const [dropdownOpen, setDropdown] = useState<boolean>(false);
  return (
    <li
      className="relative pl-2  "
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
    >
      <Link
        href={link}
        className={`flex items-center justify-center gap-3 w-full py-2 px-3  ${
          dropdownOpen ? "text-primary" : "text-gray-900"
        } rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-primary md:p-0`}
      >
        <span>{title}</span>

        {dropdowns && dropdowns.length > 0 && (
          <FaChevronDown className="text-[14px]" />
        )}
      </Link>
      {dropdowns && dropdowns.length > 0 && dropdownOpen && (
        <div
          id="dropdownNavbar"
          className="z-10 md:absolute top-[100%] font-normal bg-white divide-y divide-gray-100 shadow-md rounded-lg w-full md:w-[130px] "
        >
          <ul className="text-[16px] font-medium text-gray-800 w-full">
            {dropdowns.map((dropdown, index) => (
              <li key={index} className="text-center md:text-left">
                <Link
                  href={dropdown.link}
                  className="block px-4 py-2 pl-2 hover:text-primary hover:pl-4 hover:bg-primary/10 transition-all duration-300"
                >
                  {dropdown.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
