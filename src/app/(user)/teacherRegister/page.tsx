import TeacherRegistrationPage from "@/components/becomeATeacher/formRegister/TeacherRegistrationPage";
import Breadcrumb from "@/components/common/BreadCrumb";
import React from "react";

export default function page() {
  return (
    <>
      {" "}
      <Breadcrumb title="Teacher Registration" />
      <TeacherRegistrationPage />
    </>
  );
}
