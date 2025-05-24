import Image from "next/image";
import React from "react";
import image1 from "@/assets/about-us/aboutus.png";
import BreadCrumb from "@/components/common/BreadCrumb";

export default function page() {
  return (
    <>
      <BreadCrumb
        title={"About us"}
        subTitle="about us"
        subTitleLink="/about us"
      />
      <div className="container bg-primary">
        <div className="flex ">
          <div>
            <Image
              className="w-auto h-[500px] rounded-md"
              src={image1}
              alt="logo"
            />
          </div>
          <div>
            <h1>About us</h1>
            <h2>
              Bridging knowledge and opportunity through seamless connections.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
