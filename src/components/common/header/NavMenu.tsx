"use client";

import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import gradeService, { Grade } from "@/services/gradeServices";

interface NavMenuProps {
  navbaropen: boolean;
}

export default function NavMenu({ navbaropen }: NavMenuProps) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await gradeService.getAllGrades();
        setGrades(data);
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div
      className={`items-center justify-between mt-0 md:mr-[150px] ${
        navbaropen
          ? "absolute top-[80%] w-full hover:bg-primary/10 rounded-md md:static"
          : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
    >
      <ul className="flex flex-col p-2 text-white bg-white md:bg-transparent shadow:lg md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 w-full">
        <NavLink title="Home" link="/" />
        <NavLink title="Become A Teacher" link="/becomeATeacher" />
        <NavLink title="Find a Teacher" link="/teachers" />

        <NavLink
          title="Available Classes"
          link="/grades"
          dropdowns={
            loading
              ? [{ title: "Loading...", link: "#" }]
              : grades.map((grade) => ({
                  title: `Grade ${grade.name}`,
                  link: `/grades/${grade.slug}`,
                }))
          }
        />
      </ul>
    </div>
  );
}
