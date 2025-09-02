import React from "react";
import NavLink from "./NavLink";

export default function NavMenu({ navbaropen }: { navbaropen: boolean }) {
  return (
    <div
      className={`items-center justify-between mt-0 md:mr-[150px] ${
        navbaropen
          ? "absolute top-[80%] w-full hover:bg-primary/10 rounded-md md:static"
          : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
    >
      <ul className="flex flex-col p-2 text-white bg-white md:bg-transparent shadow:lg md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 w-full">
        <NavLink title="Home" link="/" />
        <NavLink title="About Us" link="/about-us" />

        <NavLink
          title="Find a Teacher"
          link="/teachers"
        />
        <NavLink title="Contact Us" link="/contact-us" />
      </ul>
    </div>
  );
}
