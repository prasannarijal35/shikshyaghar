import React from "react";
import NavLink from "./NavLink";

export default function NavMenu({ navbaropen }: { navbaropen: boolean }) {
  return (
    <div
      className={`items-center justify-between mt-0 md:mr-[150px] ${
        navbaropen
          ? "absolute right-0 top-[50%] w-[130px] hover:bg-primary/10 rounded-md md:static"
          : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
    >
      <ul className="flex flex-col p-2  text-white shadow:lg md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 w-[150px] ">
        <NavLink title="About" link="/" />
        <NavLink
          title="Programs"
          link="#"
          dropdowns={[
            { title: "Class 8", link: "#" },
            { title: "Class 9", link: "#" },
            { title: "Class 10", link: "#" },
            { title: "Grade 11 (Science)", link: "#" },
            { title: "Grade 11 (Management)", link: "#" },
            { title: "Grade 12 (Science)", link: "#" },
            { title: "Grade 12 (Management)", link: "#" },
          ]}
        />
        <NavLink
          title="Trainings"
          link="#"
          dropdowns={[
            { title: "Medical Entrance Preparation", link: "#" },
            { title: "Engineering Entrance Preparation", link: "#" },
            { title: "SEE Preparation", link: "#" },
          ]}
        />
      </ul>
    </div>
  );
}
