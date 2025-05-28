
import TeacherFilterPage from "@/components/teacher/teachers";
import React from "react";

export default function page() {
  return (
    <>
      <TeacherFilterPage />


import BreadCrumb from "@/components/common/BreadCrumb";
import SingleTeacherProfile from "@/components/teacher/SingleTeacherCard";
import { teachers } from "@/data/teacher";

export default function page() {
  return (
    <>
      <BreadCrumb
        title={"Teachers"}
        subTitle="teachers"
        subTitleLink="/teachers"
      />
      <div className="container bg-white pb-28">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">All Teachers</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <SingleTeacherProfile key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
